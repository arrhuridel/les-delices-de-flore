import Link from 'next/link';
import { Leaf, Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const navLinks = [
  { href: '/boutique', label: 'Boutique' },
  { href: '/reservation', label: 'Réservation' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-anthracite text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-berry rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-cream">
                Les Délices <span className="text-berry-light">de Flore</span>
              </span>
            </Link>
            <p className="text-warm-gray text-sm leading-relaxed mb-6 max-w-sm">
              Confitures artisanales, récoltées avec soin. Flore &amp; Mathieu Durand préparent
              leurs confitures avec passion au cœur de la Provence, en utilisant uniquement des
              fruits de saison et des ingrédients locaux.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-warm-gray/20 rounded-full flex items-center justify-center hover:bg-berry transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-warm-gray/20 rounded-full flex items-center justify-center hover:bg-berry transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-5 text-cream">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-gray text-sm hover:text-berry-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/panier"
                  className="text-warm-gray text-sm hover:text-berry-light transition-colors"
                >
                  Mon panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-5 text-cream">Nous trouver</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-warm-gray">
                <MapPin className="w-4 h-4 mt-0.5 text-berry-light flex-shrink-0" />
                <span>
                  Les Délices de Flore
                  <br />
                  12 chemin des Oliviers
                  <br />
                  84000 Avignon, Provence
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-warm-gray">
                <Phone className="w-4 h-4 text-berry-light flex-shrink-0" />
                <a href="tel:+33490123456" className="hover:text-berry-light transition-colors">
                  +33 (0)4 90 12 34 56
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-warm-gray">
                <Mail className="w-4 h-4 text-berry-light flex-shrink-0" />
                <a
                  href="mailto:contact@lesdelicesdeflore.fr"
                  className="hover:text-berry-light transition-colors"
                >
                  contact@lesdelicesdeflore.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-warm-gray/20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray text-sm">
            © 2025 Les Délices de Flore. Tous droits réservés.
          </p>
          <p className="text-warm-gray text-sm flex items-center gap-1">
            Fait avec{' '}
            <span className="text-berry-light" aria-label="amour">
              ♥
            </span>{' '}
            en Provence
          </p>
        </div>
      </div>
    </footer>
  );
}
