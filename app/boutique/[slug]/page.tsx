export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatPrice, getCategoryGradient, getCategoryLabel, cn } from '@/lib/utils';
import ProductCard from '@/components/shop/ProductCard';
import AddToCartButton from '@/components/shop/AddToCartButton';
import { ChevronRight, Package, Clock, ShieldCheck, Leaf } from 'lucide-react';
import type { Product } from '@/types';

interface ProductPageProps {
  params: { slug: string };
}

async function getProduct(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { slug, active: true },
  });
  return product as Product | null;
}

async function getRelatedProducts(category: string, excludeSlug: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      active: true,
      category,
      NOT: { slug: excludeSlug },
    },
    take: 3,
    orderBy: { createdAt: 'asc' },
  });
  if (products.length < 3) {
    const extra = await prisma.product.findMany({
      where: {
        active: true,
        NOT: { slug: excludeSlug },
      },
      take: 3 - products.length,
      orderBy: { createdAt: 'desc' },
    });
    return [...products, ...extra] as Product[];
  }
  return products as Product[];
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: 'Produit introuvable' };
  return {
    title: product.name,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ where: { active: true }, select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

const PRODUCT_DETAILS = [
  {
    icon: <Package className="w-4 h-4 text-apricot-dark" />,
    label: 'Conditionnement',
    value: 'Pot en verre recyclable avec étiquette artisanale',
  },
  {
    icon: <Clock className="w-4 h-4 text-apricot-dark" />,
    label: 'Conservation',
    value: '24 mois non entamé. 4 semaines après ouverture au réfrigérateur.',
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-apricot-dark" />,
    label: 'Allergènes',
    value: 'Sans gluten. Peut contenir des traces de fruits à coque.',
  },
  {
    icon: <Leaf className="w-4 h-4 text-apricot-dark" />,
    label: 'Ingrédients',
    value: 'Fruits, sucre de canne non raffiné, jus de citron. Sans additifs ni conservateurs.',
  },
];

const badgeStyles: Record<string, string> = {
  Bestseller: 'bg-berry text-white',
  'Coup de cœur': 'bg-apricot text-anthracite',
  Nouveau: 'bg-sage text-white',
  Prestige: 'bg-anthracite text-cream',
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.category, product.slug);
  const gradient = getCategoryGradient(product.category);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-warm-gray py-6">
          <Link href="/" className="hover:text-berry transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/boutique" className="hover:text-berry transition-colors">Boutique</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-anthracite font-medium">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Image */}
          <div className="space-y-4">
            <div
              className={cn(
                'aspect-square rounded-3xl bg-gradient-to-br overflow-hidden relative shadow-xl',
                gradient
              )}
            >
              {/* Decoration */}
              <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white/20" />
              <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-white/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-inner">
                  <span className="text-8xl" role="img" aria-label="confiture">🍓</span>
                </div>
              </div>
              {/* Badge */}
              {product.badge && (
                <div
                  className={cn(
                    'absolute top-5 left-5 px-3 py-1.5 rounded-full text-sm font-semibold',
                    badgeStyles[product.badge] ?? 'bg-berry text-white'
                  )}
                >
                  {product.badge}
                </div>
              )}
            </div>

            {/* Category pill */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-sage-light text-sage-dark text-xs font-medium">
                {getCategoryLabel(product.category)}
              </span>
              {product.stock <= 5 && product.stock > 0 && (
                <span className="px-3 py-1 rounded-full bg-apricot-light text-apricot-dark text-xs font-medium">
                  Plus que {product.stock} en stock !
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-anthracite mb-4 leading-tight">
              {product.name}
            </h1>

            <p className="text-warm-gray leading-relaxed text-lg mb-8">
              {product.description}
            </p>

            {/* Price & Weight */}
            <div className="flex items-end gap-3 mb-8">
              <span className="font-serif text-4xl font-bold text-anthracite">
                {formatPrice(product.price)}
              </span>
              <span className="text-warm-gray text-lg pb-1">/ {product.weight}</span>
            </div>

            {/* Add to cart */}
            {product.stock > 0 ? (
              <AddToCartButton product={product} />
            ) : (
              <div className="bg-light-border rounded-2xl p-4 text-center text-warm-gray">
                Ce produit est temporairement en rupture de stock.
              </div>
            )}

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: '🚚', label: 'Livraison France' },
                { icon: '🔒', label: 'Paiement sécurisé' },
                { icon: '🌿', label: 'Sans conservateurs' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white border border-light-border text-center"
                >
                  <span className="text-xl" role="img" aria-label={badge.label}>{badge.icon}</span>
                  <span className="text-xs text-warm-gray font-medium leading-tight">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mb-24">
          <h2 className="font-serif text-2xl font-bold text-anthracite mb-8">
            Informations produit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRODUCT_DETAILS.map((detail) => (
              <div
                key={detail.label}
                className="flex gap-4 p-5 bg-white rounded-2xl border border-light-border"
              >
                <div className="w-9 h-9 rounded-xl bg-apricot-light flex items-center justify-center flex-shrink-0">
                  {detail.icon}
                </div>
                <div>
                  <p className="font-semibold text-anthracite text-sm mb-1">{detail.label}</p>
                  <p className="text-warm-gray text-sm leading-relaxed">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-anthracite mb-8">
              Vous pourriez aussi aimer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
