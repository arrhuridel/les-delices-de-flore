import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceInCents / 100);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function getCategoryGradient(category: string): string {
  const gradients: Record<string, string> = {
    été: 'from-rose-200 via-red-100 to-orange-200',
    automne: 'from-amber-200 via-orange-100 to-yellow-200',
    printemps: 'from-pink-200 via-rose-100 to-fuchsia-200',
    hiver: 'from-orange-300 via-red-200 to-amber-100',
    exotique: 'from-yellow-200 via-lime-100 to-emerald-200',
  };
  return gradients[category] ?? 'from-apricot-light via-cream to-berry-light';
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    été: 'Été',
    automne: 'Automne',
    printemps: 'Printemps',
    hiver: 'Hiver',
    exotique: 'Exotique',
  };
  return labels[category] ?? category;
}
