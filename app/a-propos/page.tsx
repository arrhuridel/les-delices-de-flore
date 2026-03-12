import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Leaf, Heart, Award, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "L'histoire de Flore & Mathieu Durand, artisans confituriers en Provence. Découvrez leur passion, leurs valeurs et leur savoir-faire.",
};

const TIMELINE = [
  {
    year: '2015',
    title: 'Les débuts',
    description:
      "Flore et Mathieu commencent à préparer leurs premières confitures dans leur cuisine d'Avignon. Un projet passion qui devient rapidement une véritable vocation.",
  },
  {
    year: '2017',
    title: 'L\'atelier',
    description:
      "Après deux ans de succès sur les marchés provençaux, ils aménagent leur atelier dédié au 12 chemin des Oliviers. Un espace chaleureux à leur image.",
  },
  {
    year: '2019',
    title: 'Les ateliers de cuisine',
    description:
      "Face aux nombreuses demandes, ils lancent leurs ateliers de fabrication ouverts au public. Partager leur passion devient une priorité.",
  },
  {
    year: '2021',
    title: 'La boutique en ligne',
    description:
      "Les Délices de Flore s'ouvrent à toute la France avec le lancement de leur boutique en ligne. Les confitures artisanales provençales partout en France.",
  },
  {
    year: '2024',
    title: 'Aujourd\'hui',
    description:
      "12 créations originales, des clients fidèles partout en France et une passion intacte pour les saveurs authentiques. L'aventure continue !",
  },
];

const VALUES = [
  {
    icon: <Leaf className="w-6 h-6 text-sage" />,
    title: 'Circuits courts',
    description:
      'Nous travaillons exclusivement avec des producteurs locaux dans un rayon de 100km autour d\'Avignon. Fraîcheur et traçabilité garanties.',
  },
  {
    icon: <Heart className="w-6 h-6 text-berry" />,
    title: 'Passion & créativité',
    description:
      'Chaque recette est imaginée, testée et perfectionnée par Flore. Elle aime bousculer les codes avec des associations inattendues et délicieuses.',
  },
  {
    icon: <Award className="w-6 h-6 text-apricot-dark" />,
    title: 'Qualité artisanale',
    description:
      'Petites fournées, cuisson à la casserole en cuivre, aucun additif. Comme à la maison, mais avec un savoir-faire de chef pâtissier.',
  },
  {
    icon: <Star className="w-6 h-6 text-apricot-dark" />,
    title: 'Transparence',
    description:
      'Nos étiquettes disent tout : les ingrédients, leur provenance, la date de fabrication. Nous n\'avons rien à cacher — et tout à partager.',
  },
];

const PROCESS = [
  {
    step: '01',
    icon: '🌿',
    title: 'La cueillette',
    description:
      'Flore parcourt les vergers et jardins de nos producteurs partenaires pour sélectionner les fruits au meilleur de leur maturité.',
  },
  {
    step: '02',
    icon: '🔪',
    title: 'La préparation',
    description:
      'Chaque fruit est lavé, épluché et coupé à la main dans notre atelier. Une étape essentielle qui garantit la qualité finale.',
  },
  {
    step: '03',
    icon: '🫕',
    title: 'La cuisson',
    description:
      'Mathieu cuit les confitures à l\'ancienne, dans une grande bassine en cuivre, à feu doux, en remuant constamment.',
  },
  {
    step: '04',
    icon: '🫙',
    title: 'La mise en pot',
    description:
      'Chaque pot est rempli à la main, retourné pour créer le vide, puis étiqueté avec soin. Un geste artisanal à chaque fois.',
  },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-cream">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cream via-apricot-light/30 to-berry-light/10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-berry text-sm font-semibold tracking-widest uppercase">
            Notre histoire
          </span>
          <h1 className="section-title mt-2 mb-6">
            Flore &amp; Mathieu,
            <br />
            <span className="text-berry">artisans passionnés</span>
          </h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Depuis 2015, nous créons des confitures artisanales au cœur de la Provence, avec un
            seul objectif : faire partager notre amour des bonnes choses.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image placeholder */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-apricot-light via-apricot to-berry-light/60 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                  <div className="w-32 h-32 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center mb-6 shadow-inner">
                    <span className="text-7xl" role="img" aria-label="Flore et Mathieu">👩‍🍳</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2 drop-shadow">
                    Flore &amp; Mathieu Durand
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow">
                    Artisans confituriers · Avignon, Provence
                  </p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 left-8 bg-white rounded-2xl shadow-xl p-4 border border-light-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-apricot-light rounded-full flex items-center justify-center">
                    <span className="text-xl" role="img" aria-label="confiture">🫙</span>
                  </div>
                  <div>
                    <p className="font-semibold text-anthracite text-sm">+1 200 pots</p>
                    <p className="text-warm-gray text-xs">préparés en 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <h2 className="section-title mb-6">
                Une histoire d&apos;amour et de saveurs
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed text-base">
                <p>
                  Flore est botaniste de formation, passionnée de plantes, d&apos;herbes aromatiques
                  et de jardins. Mathieu est chef pâtissier de métier, amoureux des textures et des
                  équilibres sucrés. Quand ils se sont rencontrés à Avignon en 2013, ils ne savaient
                  pas encore que leur passion commune pour la cuisine allait les mener si loin.
                </p>
                <p>
                  Tout a commencé avec un excédent d&apos;abricots du jardin d&apos;un ami en 2015.
                  Flore a eu l&apos;idée d&apos;y ajouter du romarin fraîchement cueilli, et
                  Mathieu a perfectionné la cuisson. La confiture Abricot &amp; Romarin était née —
                  et avec elle, une nouvelle aventure.
                </p>
                <p>
                  Aujourd&apos;hui, Les Délices de Flore propose 12 créations originales, toutes
                  préparées en petites fournées dans leur atelier d&apos;Avignon. Ils parcourent les
                  marchés provençaux, sillonnent les vergers de la région et s&apos;associent avec
                  des producteurs locaux pour garantir la qualité de chaque ingrédient.
                </p>
                <p>
                  Leur credo ? L&apos;alliance inattendue. La fraise avec le basilic, la pêche avec
                  la lavande, la cerise griotte avec le chocolat noir. Des mariages audacieux qui
                  font l&apos;identité unique de leur maison.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Notre parcours</h2>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-light-border hidden sm:block" />
            <div className="space-y-8">
              {TIMELINE.map((item) => (
                <div key={item.year} className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-berry flex items-center justify-center text-white font-bold text-xs z-10 relative">
                    {item.year}
                  </div>
                  <div className="flex-1 bg-cream rounded-2xl p-5 border border-light-border">
                    <h3 className="font-serif text-lg font-semibold text-anthracite mb-2">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-berry text-sm font-semibold tracking-widest uppercase">
              Nos valeurs
            </span>
            <h2 className="section-title mt-2 mb-4">Ce en quoi nous croyons</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 border border-light-border hover:border-berry/30 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-cream border border-light-border flex items-center justify-center mx-auto mb-5">
                  {value.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-anthracite mb-3">
                  {value.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-berry text-sm font-semibold tracking-widest uppercase">
              Notre processus
            </span>
            <h2 className="section-title mt-2 mb-4">Du verger au pot, avec amour</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Chaque confiture est le résultat d&apos;un processus artisanal rigoureux, de la
              cueillette à la mise en pot.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((step) => (
              <div key={step.step} className="text-center group">
                <div className="relative mb-5 mx-auto w-20 h-20">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-apricot-light to-berry-light flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <span className="text-3xl" role="img" aria-label={step.title}>{step.icon}</span>
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-berry text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-anthracite mb-2">
                  {step.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press / Certifications */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Ils parlent de nous</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                source: 'Le Monde des Saveurs',
                quote:
                  '"Les Délices de Flore redéfinissent l\'art de la confiture artisanale. Des associations audacieuses, une qualité irréprochable."',
              },
              {
                source: 'Saveurs de Provence',
                quote:
                  '"Flore et Mathieu sont devenus une référence incontournable dans le paysage de l\'artisanat provençal."',
              },
              {
                source: 'Le Figaro Cuisine',
                quote:
                  '"La confiture Cerise & Chocolat Noir est simplement un chef-d\'œuvre. On en redemande !"',
              },
            ].map((item) => (
              <div
                key={item.source}
                className="bg-white rounded-2xl p-6 border border-light-border shadow-sm text-center"
              >
                <p className="text-warm-gray text-sm italic leading-relaxed mb-4">{item.quote}</p>
                <p className="font-semibold text-berry text-sm">{item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-anthracite">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-cream mb-4">
            Prêt à découvrir nos créations ?
          </h2>
          <p className="text-warm-gray mb-8 leading-relaxed">
            Parcourez notre boutique en ligne ou venez nous rendre visite à Avignon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/boutique" className="btn-primary px-8">
              Découvrir la boutique
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline px-8 text-cream border-cream/30 hover:border-cream hover:text-cream hover:bg-white/10">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
