import ProductCard from './ProductCard';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 bg-apricot-light rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl" role="img" aria-label="pot de confiture">
            🫙
          </span>
        </div>
        <h3 className="font-serif text-xl font-semibold text-anthracite mb-2">
          Aucun produit trouvé
        </h3>
        <p className="text-warm-gray text-sm">
          Essayez une autre catégorie ou revenez bientôt pour de nouvelles créations.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
