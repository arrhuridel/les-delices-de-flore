import Link from 'next/link';
import { ArrowLeft, Leaf } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
      <div className="text-center px-4 animate-scale-in">
        <div className="w-24 h-24 bg-apricot-light rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-5xl" role="img" aria-label="pot de confiture">🫙</span>
        </div>
        <h1 className="font-serif text-6xl font-bold text-berry mb-4">404</h1>
        <h2 className="font-serif text-2xl font-semibold text-anthracite mb-4">
          Page introuvable
        </h2>
        <p className="text-warm-gray max-w-sm mx-auto mb-8 leading-relaxed">
          Cette page a peut-être été déplacée ou n&apos;existe plus. Retournez à l&apos;accueil
          pour continuer votre visite.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <Link href="/boutique" className="btn-secondary">
            <Leaf className="w-4 h-4" />
            Voir la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
