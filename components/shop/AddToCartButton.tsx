'use client';
import { useState } from 'react';
import { ShoppingBag, Check, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuantity(1);
    }, 2000);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-3 bg-white border border-light-border rounded-full px-2 py-1">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-apricot-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Diminuer"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-8 text-center font-semibold text-anthracite">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => Math.min(10, q + 1))}
          disabled={quantity >= Math.min(10, product.stock)}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-apricot-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Augmenter"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        className={cn(
          'flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300',
          added
            ? 'bg-sage text-white scale-95'
            : 'bg-berry text-white hover:bg-berry-dark hover:shadow-lg hover:-translate-y-0.5'
        )}
        aria-label={`Ajouter ${quantity} ${product.name} au panier`}
      >
        {added ? (
          <>
            <Check className="w-5 h-5" />
            Ajouté au panier !
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" />
            Ajouter au panier
          </>
        )}
      </button>
    </div>
  );
}
