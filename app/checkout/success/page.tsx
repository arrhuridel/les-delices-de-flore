'use client';
import { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { CheckCircle, ArrowRight, Package, Mail } from 'lucide-react';

function SuccessContent() {
  const { clearCart } = useCartStore();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-lg mx-auto px-4 text-center animate-scale-in">
      {/* Success icon */}
      <div className="relative mb-8">
        <div className="w-28 h-28 bg-sage-light rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle className="w-14 h-14 text-sage-dark" />
        </div>
        <div className="absolute top-2 left-1/2 -translate-x-16 w-4 h-4 bg-berry rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="absolute top-4 left-1/2 translate-x-10 w-3 h-3 bg-apricot rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-0 left-1/2 -translate-x-6 w-2 h-2 bg-sage rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>

      <h1 className="font-serif text-4xl font-bold text-anthracite mb-4">
        Commande confirmée !
      </h1>
      <p className="text-warm-gray text-lg leading-relaxed mb-2">
        Merci pour votre commande. Flore &amp; Mathieu préparent vos confitures avec amour.
      </p>
      {sessionId && (
        <p className="text-warm-gray text-sm mb-8">
          Référence :{' '}
          <span className="font-mono text-anthracite text-xs">
            {sessionId.substring(0, 20)}...
          </span>
        </p>
      )}

      {/* Steps */}
      <div className="bg-white rounded-2xl border border-light-border p-6 mb-8 text-left space-y-4">
        <h2 className="font-serif text-lg font-semibold text-anthracite mb-4 text-center">
          Et maintenant ?
        </h2>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-berry-light flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-berry" />
          </div>
          <div>
            <p className="font-medium text-anthracite text-sm">E-mail de confirmation</p>
            <p className="text-warm-gray text-xs mt-0.5 leading-relaxed">
              Vous allez recevoir un e-mail de confirmation avec le récapitulatif de votre
              commande.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-apricot-light flex items-center justify-center flex-shrink-0">
            <span className="text-xl" role="img" aria-label="préparation">
              🫙
            </span>
          </div>
          <div>
            <p className="font-medium text-anthracite text-sm">Préparation artisanale</p>
            <p className="text-warm-gray text-xs mt-0.5 leading-relaxed">
              Flore &amp; Mathieu préparent votre commande avec soin dans les 2 à 3 jours
              ouvrés.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-sage-dark" />
          </div>
          <div>
            <p className="font-medium text-anthracite text-sm">Expédition &amp; livraison</p>
            <p className="text-warm-gray text-xs mt-0.5 leading-relaxed">
              Votre colis est expédié en colissimo suivi sous 3 à 5 jours ouvrés après
              expédition.
            </p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/boutique" className="btn-primary px-8">
          Continuer mes achats
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/" className="btn-outline px-8">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-cream">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-berry-light border-t-berry rounded-full animate-spin" />
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
