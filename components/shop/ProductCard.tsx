'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn, formatPrice, getCategoryGradient, getCategoryLabel } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const badgeStyles: Record<string, string> = {
  Bestseller: 'bg-berry text-white',
  'Coup de cœur': 'bg-apricot text-anthracite',
  Nouveau: 'bg-sage text-white',
  Prestige: 'bg-anthracite text-cream',
};

export default function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const gradient = getCategoryGradient(product.category);

  return (
    <Link href={`/boutique/${product.slug}`} className="group block">
      <div className="card h-full flex flex-col">
        {/* Image Placeholder */}
        <div className={cn('relative h-48 bg-gradient-to-br overflow-hidden', gradient)}>
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/20" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <span className="text-4xl" role="img" aria-label="confiture">
                🍓
              </span>
            </div>
          </div>
          {/* Badge */}
          {product.badge && (
            <div
              className={cn(
                'absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold',
                badgeStyles[product.badge] ?? 'bg-berry text-white'
              )}
            >
              {product.badge}
            </div>
          )}
          {/* Category label */}
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/70 text-anthracite text-xs font-medium">
            {getCategoryLabel(product.category)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="font-serif text-lg font-semibold text-anthracite mb-1 group-hover:text-berry transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-warm-gray text-sm leading-relaxed mb-3 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-light-border">
            <div>
              <span className="font-bold text-anthracite text-lg">{formatPrice(product.price)}</span>
              <span className="text-warm-gray text-xs ml-1">/ {product.weight}</span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200',
                added
                  ? 'bg-sage text-white scale-95'
                  : product.stock === 0
                  ? 'bg-light-border text-warm-gray cursor-not-allowed'
                  : 'bg-berry text-white hover:bg-berry-dark hover:shadow-md hover:-translate-y-0.5'
              )}
              aria-label={`Ajouter ${product.name} au panier`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Ajouté
                </>
              ) : product.stock === 0 ? (
                'Rupture'
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Ajouter
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
