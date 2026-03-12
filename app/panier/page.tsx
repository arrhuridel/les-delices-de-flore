'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, cn, getCategoryGradient } from '@/lib/utils';
import { ShoppingBag, ArrowLeft, Loader2, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice >= 4000 ? 0 : 490; // Free over €40
  const grandTotal = totalPrice + shipping;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setError(null);
    try {
      const payload = {
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        successUrl: `${window.location.origin}/checkout/success`,
        cancelUrl: `${window.location.origin}/panier`,
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json() as { error?: string };
        throw new Error(err.error ?? 'Une erreur est survenue lors de la commande.');
      }

      const data = await res.json() as { url: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de paiement invalide');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 bg-apricot-light rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-apricot-dark" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-anthracite mb-3">
            Votre panier est vide
          </h1>
          <p className="text-warm-gray mb-8 max-w-sm mx-auto">
            Découvrez nos confitures artisanales et ajoutez vos favorites à votre panier.
          </p>
          <Link href="/boutique" className="btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Retourner à la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-4xl font-bold text-anthracite">Mon Panier</h1>
          <Link href="/boutique" className="text-sm text-warm-gray hover:text-berry transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Continuer mes achats
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-light-border overflow-hidden">
              {items.map((item, idx) => {
                const gradient = getCategoryGradient(item.product.category);
                return (
                  <div
                    key={item.product.id}
                    className={cn(
                      'flex items-center gap-5 p-5 group',
                      idx < items.length - 1 && 'border-b border-light-border'
                    )}
                  >
                    {/* Image */}
                    <div
                      className={cn(
                        'w-20 h-20 rounded-xl flex-shrink-0 bg-gradient-to-br overflow-hidden flex items-center justify-center',
                        gradient
                      )}
                    >
                      <span className="text-3xl" role="img" aria-label="confiture">🍓</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-anthracite truncate">{item.product.name}</h3>
                      <p className="text-warm-gray text-sm">{item.product.weight}</p>
                      <p className="text-berry font-semibold mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-light-border flex items-center justify-center hover:border-berry hover:text-berry transition-colors"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= 10}
                        className="w-8 h-8 rounded-full border border-light-border flex items-center justify-center hover:border-berry hover:text-berry transition-colors disabled:opacity-40"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="text-sm text-warm-gray hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Vider le panier
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-light-border p-6 sticky top-24 space-y-4">
              <h2 className="font-serif text-xl font-bold text-anthracite">Récapitulatif</h2>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Sous-total ({items.reduce((s, i) => s + i.quantity, 0)} articles)</span>
                  <span className="font-medium text-anthracite">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Livraison</span>
                  {shipping === 0 ? (
                    <span className="text-sage font-medium">Offerte</span>
                  ) : (
                    <span className="font-medium text-anthracite">{formatPrice(shipping)}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-warm-gray bg-apricot-light/40 rounded-lg px-3 py-2">
                    Plus que {formatPrice(4000 - totalPrice)} pour la livraison offerte !
                  </p>
                )}
                <div className="border-t border-light-border pt-3 flex justify-between">
                  <span className="font-bold text-anthracite">Total</span>
                  <span className="font-bold text-2xl text-anthracite">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn-primary w-full py-4 text-base"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirection...
                  </>
                ) : (
                  <>
                    Passer commande
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="text-xs text-warm-gray">Paiement sécurisé par</span>
                <span className="text-xs font-bold text-anthracite">Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
