import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { checkoutSchema } from '@/lib/validations';

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
}

export async function POST(request: NextRequest) {
  // CSRF protection: check Origin header
  const origin = request.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json(
      { error: 'Accès refusé' },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Données invalides', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { items, successUrl, cancelUrl } = parsed.data;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  // Verify products and check stock
  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, active: true },
  });

  if (products.length !== productIds.length) {
    return NextResponse.json(
      { error: 'Un ou plusieurs produits sont introuvables ou indisponibles.' },
      { status: 400 }
    );
  }

  // Check stock for each item
  const stockErrors: string[] = [];
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    if (product.stock < item.quantity) {
      stockErrors.push(
        `Stock insuffisant pour "${product.name}" (disponible: ${product.stock}, demandé: ${item.quantity})`
      );
    }
  }

  if (stockErrors.length > 0) {
    return NextResponse.json({ error: stockErrors.join('. ') }, { status: 409 });
  }

  // Build Stripe line items
  const lineItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: product.name,
          description: `Confiture artisanale ${product.weight}`,
          metadata: { productId: product.id, slug: product.slug },
        },
        unit_amount: product.price,
      },
      quantity: item.quantity,
    };
  });

  // Create Stripe checkout session
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url:
        successUrl ?? `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl ?? `${appUrl}/panier`,
      locale: 'fr',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 490, currency: 'eur' },
            display_name: 'Colissimo suivi',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'eur' },
            display_name: 'Retrait en atelier (Avignon)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
      ],
      metadata: {
        productIds: JSON.stringify(items.map((i) => ({ id: i.productId, qty: i.quantity }))),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe session creation error:', err);
    return NextResponse.json(
      { error: 'Impossible de créer la session de paiement. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
