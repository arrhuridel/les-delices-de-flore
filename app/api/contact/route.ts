import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations';

export const runtime = 'nodejs';

// Simple in-memory rate limiter (per IP, max 3 contact messages per 10 minutes)
const contactRateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = contactRateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    contactRateLimit.set(ip, { count: 1, resetAt: now + 10 * 60_000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Trop de messages envoyés. Veuillez patienter 10 minutes.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Données invalides', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    // Save to database
    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    // Send email via Resend (if API key is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'contact@lesdelicesdeflore.fr';

        // Notification to the shop
        await resend.emails.send({
          from: fromEmail,
          to: fromEmail,
          replyTo: email,
          subject: `[Contact] ${subject} — ${name}`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #C8538A;">Nouveau message de contact</h2>
              <p><strong>De :</strong> ${name} (${email})</p>
              <p><strong>Objet :</strong> ${subject}</p>
              <hr style="border: 1px solid #EDE8E0; margin: 16px 0;" />
              <p style="white-space: pre-wrap; color: #2D2D2D;">${message}</p>
              <hr style="border: 1px solid #EDE8E0; margin: 16px 0;" />
              <p style="color: #6B6560; font-size: 12px;">
                Les Délices de Flore — Message reçu le ${new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          `,
        });

        // Auto-reply to the customer
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: 'Nous avons bien reçu votre message — Les Délices de Flore',
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FDFAF6;">
              <h2 style="color: #C8538A; font-size: 24px;">Merci pour votre message, ${name} !</h2>
              <p style="color: #2D2D2D; line-height: 1.6;">
                Nous avons bien reçu votre message concernant <em>"${subject}"</em>.
                Flore ou Mathieu vous répondront dans les 24 à 48 heures ouvrées.
              </p>
              <div style="background: white; border-radius: 12px; padding: 16px; margin: 24px 0; border: 1px solid #EDE8E0;">
                <p style="color: #6B6560; font-size: 14px; margin: 0;"><strong>Votre message :</strong></p>
                <p style="color: #2D2D2D; margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
              </div>
              <p style="color: #6B6560; font-size: 12px; border-top: 1px solid #EDE8E0; padding-top: 16px; margin-top: 24px;">
                Les Délices de Flore · 12 chemin des Oliviers, 84000 Avignon<br/>
                Confitures artisanales, récoltées avec soin.
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        // Log but don't fail the request — message was saved to DB
        console.error('Email sending failed:', emailErr);
      }
    } else {
      console.log(`[DEV] Contact message from ${name} (${email}): ${subject}`);
    }

    return NextResponse.json(
      { success: true, message: 'Votre message a bien été envoyé.' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error saving contact message:', err);
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer ou nous appeler directement.' },
      { status: 500 }
    );
  }
}
