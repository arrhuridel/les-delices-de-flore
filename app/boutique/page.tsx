import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import ProductGrid from '@/components/shop/ProductGrid';
import CategoryFilter from '@/components/shop/CategoryFilter';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: 'Boutique',
  description:
    'Découvrez toutes nos confitures artisanales. 12 créations originales préparées avec des fruits de saison en Provence.',
};

const CATEGORIES = [
  { value: 'all', label: 'Toutes' },
  { value: 'été', label: 'Été' },
  { value: 'automne', label: 'Automne' },
  { value: 'printemps', label: 'Printemps' },
  { value: 'hiver', label: 'Hiver' },
  { value: 'exotique', label: 'Exotique' },
];

interface BoutiquePageProps {
  searchParams: { category?: string };
}

async function getProducts(category?: string): Promise<Product[]> {
  const where: { active: boolean; category?: string } = { active: true };
  if (category && category !== 'all') {
    where.category = category;
  }
  const products = await prisma.product.findMany({
    where,
    orderBy: [{ badge: 'asc' }, { name: 'asc' }],
  });
  return products as Product[];
}

export default async function BoutiquePage({ searchParams }: BoutiquePageProps) {
  const selectedCategory = searchParams.category ?? 'all';
  const products = await getProducts(selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-cream via-apricot-light/30 to-berry-light/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-berry text-sm font-semibold tracking-widest uppercase">
            Notre boutique
          </span>
          <h1 className="section-title mt-2 mb-4">Nos confitures artisanales</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            12 créations originales préparées avec des fruits de saison, soigneusement sélectionnés
            auprès de producteurs locaux provençaux.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Category Filter */}
        <CategoryFilter categories={CATEGORIES} selectedCategory={selectedCategory} />

        {/* Count */}
        <p className="text-warm-gray text-sm mb-6">
          {products.length} confiture{products.length !== 1 ? 's' : ''} trouvée
          {products.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
