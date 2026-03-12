export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/shop/ProductCard';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, Star, Leaf, Heart, Award } from 'lucide-react';
import type { Product } from '@/types';

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: 'asc' },
      take: 4,
    });
    return products as Product[];
  } catch {
    return [];
  }
}

const VALUES = [
  {
    icon: <Leaf className="w-6 h-6 text-sage" />,
    title: 'Ingrédients locaux',
    description:
      'Nous sélectionnons soigneusement nos fruits auprès de producteurs locaux provençaux, garantissant fraîcheur et qualité à chaque pot.',
  },
  {
    icon: <Heart className="w-6 h-6 text-berry" />,
    title: 'Recettes originales',
    description:
      'Chaque confiture est le fruit d\'une création unique, où les saveurs classiques rencontrent des associations surprenantes et audacieuses.',
  },
  {
    icon: <Award className="w-6 h-6 text-apricot-dark" />,
    title: 'Fait à la main',
    description:
      'Nos confitures sont préparées en petites quantités dans notre atelier, à la manière traditionnelle, pour une qualité artisanale incomparable.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sophie M.',
    location: 'Lyon',
    rating: 5,
    text: 'La confiture Fraise & Basilic est une révélation ! Je n\'aurais jamais imaginé cette association, et pourtant c\'est un délice. Je commande désormais chaque mois.',
  },
  {
    name: 'Pierre & Claire D.',
    location: 'Paris',
    rating: 5,
    text: 'Nous avons participé à un atelier chez Flore et Mathieu. Une expérience incroyable, chaleureux, passionnés et pédagogues. Et leurs confitures sont simplement divines.',
  },
  {
    name: 'Isabelle R.',
    location: 'Marseille',
    rating: 5,
    text: 'La confiture Figue & Vanille Bourbon est la meilleure que j\'aie jamais goûtée. La texture est parfaite, ni trop sucrée ni trop compacte. Un vrai régal du matin.',
  },
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-apricot-light/30 to-berry-light/20 pt-20">
        {/* Background decoration */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-berry/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-apricot/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-light-border text-sm text-warm-gray mb-8 animate-fade-in">
            <Leaf className="w-4 h-4 text-sage" />
            Artisans en Provence depuis 2015
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-anthracite mb-6 animate-slide-up leading-tight">
            L&apos;art de la confiture,
            <br />
            <span className="text-berry">réinventé</span>
          </h1>

          <p className="section-subtitle max-w-2xl mx-auto mb-10 animate-fade-in">
            Confitures artisanales, récoltées avec soin. Flore &amp; Mathieu Durand vous proposent
            des créations uniques, préparées à la main au cœur de la Provence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link href="/boutique" className="btn-primary px-8 py-4 text-base">
              Découvrir la boutique
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/a-propos" className="btn-secondary px-8 py-4 text-base">
              Notre histoire
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '12+', label: 'Créations uniques' },
              { value: '2015', label: 'Depuis' },
              { value: '100%', label: 'Fait main' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl font-bold text-berry">{stat.value}</div>
                <div className="text-warm-gray text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-warm-gray/40 flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-warm-gray/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-berry text-sm font-semibold tracking-widest uppercase">
              Nos créations
            </span>
            <h2 className="section-title mt-2 mb-4">Nos confitures phares</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Découvrez nos saveurs les plus appréciées, préparées avec des fruits de saison
              soigneusement sélectionnés.
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-warm-gray">
              <p>Les produits arrivent bientôt...</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/boutique" className="btn-outline px-8 py-4 text-base">
              Voir toutes nos confitures
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Notre Histoire Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-apricot-light via-apricot to-berry-light overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-28 h-28 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center mb-6 shadow-inner">
                    <span className="text-6xl" role="img" aria-label="artisans">👩‍🍳</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    Flore &amp; Mathieu
                  </h3>
                  <p className="text-white/80 text-sm">Artisans confituriers en Provence</p>
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-light-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-berry-light rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-berry" />
                  </div>
                  <div>
                    <p className="font-semibold text-anthracite text-sm">Fait avec amour</p>
                    <p className="text-warm-gray text-xs">Depuis Avignon, Provence</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="text-berry text-sm font-semibold tracking-widest uppercase">
                Notre histoire
              </span>
              <h2 className="section-title mt-2 mb-6">
                Une passion née au cœur des vergers provençaux
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed">
                <p>
                  Tout a commencé en 2015, dans la cuisine ensoleillée de notre ferme d&apos;Avignon.
                  Flore, passionnée de botanique et de cuisine, et Mathieu, ancien chef pâtissier,
                  ont décidé de conjuguer leurs talents pour créer quelque chose d&apos;unique.
                </p>
                <p>
                  Aujourd&apos;hui, chaque pot est le fruit de leur amour pour les saveurs
                  authentiques et les associations audacieuses. Ils parcourent les marchés et les
                  jardins de Provence à la recherche des meilleurs fruits de saison.
                </p>
                <p>
                  Confitures artisanales, récoltées avec soin — c&apos;est bien plus qu&apos;un
                  slogan, c&apos;est une promesse que Flore et Mathieu renouvellent à chaque
                  fournée.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/a-propos" className="btn-primary">
                  En savoir plus sur nous
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-berry text-sm font-semibold tracking-widest uppercase">
              Nos engagements
            </span>
            <h2 className="section-title mt-2 mb-4">Ce qui nous rend uniques</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Chaque pot reflète notre philosophie : qualité, authenticité et créativité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="text-center p-8 rounded-3xl bg-cream border border-light-border hover:border-berry/30 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-light-border flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-anthracite mb-3">
                  {value.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-berry/5 via-cream to-apricot/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-berry text-sm font-semibold tracking-widest uppercase">
              Témoignages
            </span>
            <h2 className="section-title mt-2 mb-4">Ce que disent nos clients</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl p-6 border border-light-border shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-apricot text-apricot" />
                  ))}
                </div>
                <p className="text-warm-gray text-sm leading-relaxed mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-berry-light flex items-center justify-center font-semibold text-berry text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-anthracite text-sm">{testimonial.name}</p>
                    <p className="text-warm-gray text-xs">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop CTA */}
      <section className="py-24 bg-anthracite relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-berry/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-apricot/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-berry-light text-sm font-semibold tracking-widest uppercase">
            Ateliers
          </span>
          <h2 className="font-serif text-4xl font-bold text-cream mt-2 mb-6">
            Venez créer votre propre confiture
          </h2>
          <p className="text-warm-gray text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Participez à nos ateliers de fabrication de confitures au cœur de notre atelier
            provençal. Une expérience authentique et gourmande avec Flore et Mathieu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation" className="btn-primary px-8 py-4 text-base bg-berry hover:bg-berry-dark">
              Réserver un atelier
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/a-propos" className="btn-outline px-8 py-4 text-base text-cream border-cream/30 hover:border-cream hover:text-cream hover:bg-white/10">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
