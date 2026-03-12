import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { bookingSchema } from '@/lib/validations';
import { parseISO } from 'date-fns';

export const runtime = 'nodejs';

// Simple in-memory rate limiter (per IP, max 5 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 5) return false;
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

// GET /api/reservations?date=YYYY-MM-DD
// Returns booked time slots for a given date
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date');

  if (!dateStr || isNaN(Date.parse(dateStr))) {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }

  try {
    const date = parseISO(dateStr);
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const reservations = await prisma.reservation.findMany({
      where: {
        date: { gte: dayStart, lte: dayEnd },
        status: 'CONFIRMED',
      },
      select: { timeSlot: true },
    });

    const bookedSlots = reservations.map((r) => r.timeSlot);
    return NextResponse.json({ bookedSlots });
  } catch (err) {
    console.error('Error fetching reservations:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST /api/reservations
// Creates a new reservation
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez patienter une minute.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Données invalides', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const reservationDate = parseISO(data.date);

  // Check the slot is not already taken
  const dayStart = new Date(reservationDate);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(reservationDate);
  dayEnd.setHours(23, 59, 59, 999);

  const existing = await prisma.reservation.findFirst({
    where: {
      date: { gte: dayStart, lte: dayEnd },
      timeSlot: data.timeSlot,
      type: data.type,
      status: 'CONFIRMED',
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: 'Ce créneau est déjà réservé. Veuillez en choisir un autre.' },
      { status: 409 }
    );
  }

  try {
    const reservation = await prisma.reservation.create({
      data: {
        date: reservationDate,
        timeSlot: data.timeSlot,
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        participants: data.participants,
        message: data.message,
        status: 'CONFIRMED',
      },
    });

    return NextResponse.json(
      {
        success: true,
        reservationId: reservation.id,
        message: 'Réservation confirmée avec succès.',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error creating reservation:', err);
    return NextResponse.json({ error: 'Erreur lors de la création de la réservation' }, { status: 500 });
  }
}
