import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/shop/CartDrawer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: {
    default: 'Les Délices de Flore — Confitures Artisanales de Provence',
    template: '%s | Les Délices de Flore',
  },
  description:
    'Confitures artisanales préparées avec amour en Provence. Saveurs originales, ingrédients locaux, livraison en France.',
  keywords: ['confiture artisanale', 'confiture provence', 'confiture bio', 'artisan', 'Flore Durand'],
  authors: [{ name: 'Les Délices de Flore' }],
  openGraph: {
    siteName: 'Les Délices de Flore',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
