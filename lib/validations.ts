import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100).trim(),
  email: z.string().email('Adresse e-mail invalide').max(200).trim().toLowerCase(),
  subject: z.string().min(3, 'Objet requis').max(200).trim(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(2000).trim(),
});

export const bookingSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(200).trim().toLowerCase(),
  phone: z.string().max(20).optional(),
  date: z.string().refine((d) => !isNaN(Date.parse(d)), 'Date invalide'),
  timeSlot: z.enum(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']),
  type: z.enum(['PICKUP', 'WORKSHOP']),
  participants: z.number().int().min(1).max(10),
  message: z.string().max(500).optional(),
});

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(50),
      })
    )
    .min(1)
    .max(20),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type CheckoutData = z.infer<typeof checkoutSchema>;
