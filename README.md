# Les Délices de Flore

**Confitures artisanales, récoltées avec soin**

Site e-commerce artisanal pour Flore & Mathieu Durand, artisans confituriers en Provence.

## Stack technique

- **Next.js 14** — App Router, TypeScript strict
- **Tailwind CSS** — Design system personnalisé (couleurs crème, abricot, berry, sauge)
- **Zustand** — Gestion du panier (persistance localStorage)
- **Prisma + SQLite** — Base de données (PostgreSQL en production)
- **Stripe** — Paiements sécurisés (checkout sessions + webhooks)
- **React Hook Form + Zod** — Formulaires avec validation
- **react-day-picker** — Calendrier de réservation
- **Resend** — Emails transactionnels (formulaire de contact)

## Démarrage rapide

### 1. Installation

```bash
cd les-delices-de-flore
npm install
```

### 2. Variables d'environnement

Copiez `.env.example` vers `.env.local` et renseignez vos clés :

```bash
cp .env.example .env.local
```

Variables obligatoires :
- `DATABASE_URL` — URL de la base de données SQLite (dev) ou PostgreSQL (prod)
- `STRIPE_SECRET_KEY` — Clé secrète Stripe (sk_test_...)
- `STRIPE_WEBHOOK_SECRET` — Secret de webhook Stripe (whsec_...)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Clé publique Stripe (pk_test_...)
- `NEXT_PUBLIC_APP_URL` — URL de l'application

### 3. Base de données

```bash
npm run db:push    # Crée/synchronise le schéma
npm run db:seed    # Insère les 12 produits
npm run db:studio  # Ouvre Prisma Studio (UI)
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
├── app/
│   ├── page.tsx                    # Accueil
│   ├── boutique/
│   │   ├── page.tsx                # Liste des produits
│   │   └── [slug]/page.tsx         # Fiche produit
│   ├── panier/page.tsx             # Panier
│   ├── checkout/success/page.tsx   # Confirmation de commande
│   ├── reservation/page.tsx        # Réservations
│   ├── a-propos/page.tsx           # À propos
│   ├── contact/page.tsx            # Contact
│   └── api/
│       ├── checkout/route.ts       # Création session Stripe
│       ├── webhook/route.ts        # Webhook Stripe
│       ├── reservations/route.ts   # Gestion des réservations
│       └── contact/route.ts        # Formulaire de contact
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # En-tête avec panier
│   │   └── Footer.tsx              # Pied de page
│   ├── shop/
│   │   ├── ProductCard.tsx         # Carte produit
│   │   ├── ProductGrid.tsx         # Grille de produits
│   │   ├── CategoryFilter.tsx      # Filtre par catégorie
│   │   ├── CartDrawer.tsx          # Tiroir panier
│   │   ├── CartItem.tsx            # Article du panier
│   │   └── AddToCartButton.tsx     # Bouton ajout au panier
│   └── booking/
│       └── BookingCalendar.tsx     # Calendrier de réservation
├── lib/
│   ├── prisma.ts                   # Client Prisma
│   ├── stripe.ts                   # Client Stripe
│   ├── utils.ts                    # Utilitaires (cn, formatPrice...)
│   └── validations.ts              # Schémas Zod
├── store/
│   └── cartStore.ts                # Store Zustand (panier)
├── types/
│   └── index.ts                    # Types TypeScript
└── prisma/
    ├── schema.prisma               # Schéma base de données
    └── seed.ts                     # Données de départ (12 produits)
```

## Configuration Stripe Webhook (dev)

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Copiez le secret `whsec_...` dans votre `.env.local`.

## Déploiement (Vercel)

1. Importez le projet sur Vercel
2. Configurez les variables d'environnement (voir `vercel.json`)
3. Changez `DATABASE_URL` pour pointer vers PostgreSQL
4. Configurez le webhook Stripe sur votre domaine de production

## Pages et fonctionnalités

| Page | Description |
|------|-------------|
| `/` | Accueil avec hero, produits vedettes, histoire, valeurs, témoignages |
| `/boutique` | Catalogue complet avec filtres par catégorie |
| `/boutique/[slug]` | Fiche produit détaillée avec produits similaires |
| `/panier` | Résumé du panier avec checkout Stripe |
| `/checkout/success` | Confirmation de commande |
| `/reservation` | Calendrier pour retrait ou atelier |
| `/a-propos` | Histoire, valeurs, processus de fabrication |
| `/contact` | Formulaire de contact avec envoi email |

© 2025 Les Délices de Flore. Tous droits réservés.
