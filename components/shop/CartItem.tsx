'use client';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn, formatPrice, getCategoryGradient } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;
  const gradient = getCategoryGradient(product.category);

  return (
    <div className="flex items-center gap-4 py-4 border-b border-light-border last:border-b-0 group">
      {/* Mini image */}
      <div
        className={cn(
          'w-14 h-14 rounded-xl flex-shrink-0 bg-gradient-to-br overflow-hidden flex items-center justify-center',
          gradient
        )}
      >
        <span className="text-2xl" role="img" aria-label="confiture">
          🍓
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-anthracite text-sm leading-tight truncate">{product.name}</h4>
        <p className="text-warm-gray text-xs mt-0.5">{product.weight}</p>
        <p className="text-berry font-semibold text-sm mt-1">{formatPrice(product.price)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="w-7 h-7 rounded-full border border-light-border flex items-center justify-center hover:border-berry hover:text-berry transition-colors"
          aria-label="Diminuer la quantité"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-6 text-center text-sm font-medium text-anthracite">{quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          disabled={quantity >= 10}
          className="w-7 h-7 rounded-full border border-light-border flex items-center justify-center hover:border-berry hover:text-berry transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Augmenter la quantité"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(product.id)}
        className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
        aria-label="Supprimer l'article"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
