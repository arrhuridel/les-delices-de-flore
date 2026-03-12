import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    slug: 'fraise-basilic',
    name: 'Fraise & Basilic',
    price: 750,
    weight: '230g',
    description:
      "Une alliance surprenante entre la douceur des fraises de nos jardins et la fraîcheur herbacée du basilic frais. Une confiture qui éveille les sens.",
    stock: 45,
    category: 'été',
    badge: 'Bestseller',
  },
  {
    slug: 'abricot-romarin',
    name: 'Abricot & Romarin',
    price: 790,
    weight: '230g',
    description:
      "Les abricots dorés de Provence rencontrent le romarin sauvage dans cette confiture solaire et parfumée. L'essence même de l'été méridional.",
    stock: 30,
    category: 'été',
    badge: null,
  },
  {
    slug: 'figue-vanille',
    name: 'Figue & Vanille Bourbon',
    price: 850,
    weight: '230g',
    description:
      "Les figues noires confites s'enveloppent de la chaleur douce de la vanille Bourbon. Une texture fondante, des saveurs profondes.",
    stock: 28,
    category: 'automne',
    badge: 'Coup de cœur',
  },
  {
    slug: 'myrtille-citron-vert',
    name: 'Myrtille & Citron Vert',
    price: 820,
    weight: '230g',
    description:
      "L'intensité sauvage des myrtilles des montagnes réveillée par le peps acidulé du citron vert. Vivifiante et délicieuse.",
    stock: 35,
    category: 'été',
    badge: null,
  },
  {
    slug: 'peche-lavande',
    name: 'Pêche & Lavande',
    price: 780,
    weight: '230g',
    description:
      "La pêche blanche juteuse infusée aux fleurs de lavande cueillie à la main. Délicate, florale et irrésistible.",
    stock: 22,
    category: 'été',
    badge: null,
  },
  {
    slug: 'framboise-rose',
    name: 'Framboise & Rose',
    price: 890,
    weight: '230g',
    description:
      "Les framboises éclatantes se parent d'un voile de pétales de rose ancienne. Élégante et romantique à souhait.",
    stock: 20,
    category: 'été',
    badge: 'Nouveau',
  },
  {
    slug: 'prune-cannelle',
    name: 'Prune & Cannelle',
    price: 760,
    weight: '230g',
    description:
      "Les pruneaux tendres d'automne épicés à la cannelle de Ceylan. Une confiture chaleureuse aux accents orientaux.",
    stock: 38,
    category: 'automne',
    badge: null,
  },
  {
    slug: 'orange-sanguine-gingembre',
    name: 'Orange Sanguine & Gingembre',
    price: 810,
    weight: '230g',
    description:
      "L'amertume douce des oranges sanguines de Sicile tonifiée par le piquant du gingembre frais. Un réveil matinal assuré.",
    stock: 42,
    category: 'hiver',
    badge: null,
  },
  {
    slug: 'cerise-chocolat',
    name: 'Cerise Griotte & Chocolat Noir',
    price: 920,
    weight: '230g',
    description:
      "Les cerises griottes acidulées fondent dans un chocolat noir 70% grand cru. Gourmande et indulgente, pour les amateurs exigeants.",
    stock: 18,
    category: 'été',
    badge: 'Prestige',
  },
  {
    slug: 'rhubarbe-fraise',
    name: 'Rhubarbe & Fraise',
    price: 740,
    weight: '230g',
    description:
      "Le mariage classique et indémodable de la rhubarbe acidulée et de la fraise sucrée. Acidulée, fruitée et profondément réconfortante.",
    stock: 50,
    category: 'printemps',
    badge: null,
  },
  {
    slug: 'mangue-passion',
    name: 'Mangue & Passion',
    price: 880,
    weight: '230g',
    description:
      "Un voyage tropical au cœur de la Provence. La mangue Alphonso et le fruit de la passion s'unissent pour une explosion exotique.",
    stock: 25,
    category: 'exotique',
    badge: null,
  },
  {
    slug: 'mirabelle-miel',
    name: "Mirabelle & Miel d'Acacia",
    price: 830,
    weight: '230g',
    description:
      "Les petites mirabelles dorées de Lorraine sublimées par notre miel d'acacia local. Dorée, fondante, et infiniment douce.",
    stock: 33,
    category: 'automne',
    badge: null,
  },
];

async function main() {
  console.log('Seeding database...');

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
    console.log(`  Upserted: ${product.name}`);
  }

  console.log(`\nDone! ${products.length} products seeded.`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
