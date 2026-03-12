'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import CartItem from './CartItem';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, getTotalItems, getTotalPrice } = useCartStore();
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) toggleCart();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, toggleCart]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    toggleCart();
    router.push('/panier');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-anthracite/50 backdrop-blur-sm z-50 animate-fade-in"
          onClick={toggleCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-cream z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Panier"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-light-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-berry" />
            <h2 className="font-serif text-xl font-semibold text-anthracite">Mon Panier</h2>
            {totalItems > 0 && (
              <span className="w-6 h-6 bg-berry text-white text-xs rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={toggleCart}
            className="p-2 rounded-full hover:bg-apricot-light transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5 text-anthracite" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pb-20">
              <div className="w-24 h-24 bg-apricot-light rounded-full flex items-center justify-center mb-6">
                <span className="text-5xl" role="img" aria-label="panier vide">
                  🛒
                </span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-anthracite mb-2">
                Votre panier est vide
              </h3>
              <p className="text-warm-gray text-sm leading-relaxed mb-6 max-w-xs">
                Découvrez nos confitures artisanales et ajoutez vos favorites.
              </p>
              <button
                onClick={() => {
                  toggleCart();
                  router.push('/boutique');
                }}
                className="btn-primary"
              >
                Découvrir la boutique
              </button>
            </div>
          ) : (
            <div className="py-4">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-light-border px-6 py-6 space-y-4 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-warm-gray text-sm">Sous-total</span>
              <span className="font-semibold text-anthracite">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-warm-gray text-sm">Livraison</span>
              <span className="text-sm text-sage font-medium">Calculée à la caisse</span>
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              className="btn-primary w-full gap-2"
            >
              Commander
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={toggleCart}
              className="w-full text-center text-sm text-warm-gray hover:text-berry transition-colors py-1"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </>
  );
}
