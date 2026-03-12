import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import type Stripe from 'stripe';

// Use Node.js runtime so we have access to crypto for webhook signature verification
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  // Handle events
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.warn('Payment failed for PaymentIntent:', paymentIntent.id);
        break;
      }
      default:
        // Unhandled event type — ignore
        break;
    }
  } catch (err) {
    console.error('Error processing webhook event:', err);
    // Return 200 so Stripe doesn't retry — log the error for manual investigation
    return NextResponse.json({ received: true, warning: 'Processing error logged' });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  // Idempotency: skip if order already exists
  const existing = await prisma.order.findUnique({
    where: { stripeSessionId: session.id },
  });
  if (existing) {
    console.log('Order already exists for session:', session.id);
    return;
  }

  // Parse items from session metadata
  const rawItems = session.metadata?.productIds;
  if (!rawItems) {
    console.error('No productIds metadata in session:', session.id);
    return;
  }

  let itemsData: Array<{ id: string; qty: number }>;
  try {
    itemsData = JSON.parse(rawItems) as Array<{ id: string; qty: number }>;
  } catch {
    console.error('Failed to parse productIds metadata:', rawItems);
    return;
  }

  // Fetch products to get current prices
  const productIds = itemsData.map((i) => i.id);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const customerName = session.customer_details?.name ?? 'Client';
  const customerEmail = session.customer_details?.email ?? '';
  const total = session.amount_total ?? 0;

  // Create order with items
  const order = await prisma.order.create({
    data: {
      stripeSessionId: session.id,
      stripePaymentId: session.payment_intent as string | undefined,
      status: 'PAID',
      customerName,
      customerEmail,
      total,
      items: {
        create: itemsData.map((item) => {
          const product = products.find((p) => p.id === item.id);
          return {
            productId: item.id,
            quantity: item.qty,
            price: product?.price ?? 0,
          };
        }),
      },
    },
  });

  // Decrement stock for each product
  for (const item of itemsData) {
    await prisma.product.update({
      where: { id: item.id },
      data: { stock: { decrement: item.qty } },
    });
  }

  console.log('Order created successfully:', order.id);
}
