import type { Metadata } from 'next';
import BookingCalendar from '@/components/booking/BookingCalendar';
import { ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Réservation',
  description:
    'Réservez votre retrait de commande ou participez à un atelier de fabrication de confitures avec Flore & Mathieu en Provence.',
};

const FAQ = [
  {
    question: 'Combien de temps dure un atelier ?',
    answer:
      'Nos ateliers durent environ 2h30. Vous repartirez avec vos propres pots de confiture faits à la main !',
  },
  {
    question: 'Quelle est la taille des groupes pour les ateliers ?',
    answer:
      'Nous accueillons des groupes de 2 à 6 personnes maximum pour garantir une expérience intime et personnalisée.',
  },
  {
    question: 'Faut-il payer à la réservation ?',
    answer:
      'Non, la réservation est gratuite. Le paiement se fait sur place pour les ateliers, ou en ligne pour les commandes à retirer.',
  },
  {
    question: 'Puis-je annuler ma réservation ?',
    answer:
      'Oui, vous pouvez annuler jusqu\'à 48h avant votre réservation en nous contactant par e-mail ou téléphone.',
  },
  {
    question: 'Y a-t-il un minimum de commande pour le retrait ?',
    answer:
      'Pas de minimum pour le retrait ! Vous pouvez réserver un créneau pour récupérer même un seul pot.',
  },
];

export default function ReservationPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-cream via-berry/5 to-apricot-light/20 py-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-berry text-sm font-semibold tracking-widest uppercase">
            Réservation
          </span>
          <h1 className="section-title mt-2 mb-4">Venez nous rendre visite</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Deux façons de nous rencontrer : retirez votre commande à notre atelier ou participez
            à une session de fabrication de confitures avec Flore &amp; Mathieu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Type cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-3xl border border-light-border p-8 hover:border-berry/30 hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-apricot-light rounded-2xl flex items-center justify-center mb-5">
              <span className="text-3xl" role="img" aria-label="retrait">🛍️</span>
            </div>
            <h2 className="font-serif text-xl font-bold text-anthracite mb-3">
              Retrait de commande
            </h2>
            <p className="text-warm-gray text-sm leading-relaxed mb-4">
              Passez votre commande en ligne puis venez la retirer directement à notre atelier
              à Avignon. Gratuit et rapide, sans frais de port !
            </p>
            <ul className="space-y-2">
              {['Lundi au Samedi', '09h00 — 17h00', 'Atelier d\'Avignon', 'Gratuit'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-warm-gray">
                  <span className="w-1.5 h-1.5 rounded-full bg-apricot-dark flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-light-border p-8 hover:border-berry/30 hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-berry-light rounded-2xl flex items-center justify-center mb-5">
              <span className="text-3xl" role="img" aria-label="atelier">👩‍🍳</span>
            </div>
            <h2 className="font-serif text-xl font-bold text-anthracite mb-3">
              Atelier de cuisine
            </h2>
            <p className="text-warm-gray text-sm leading-relaxed mb-4">
              Apprenez les secrets de la confiture artisanale avec Flore et Mathieu. Une expérience
              unique de 2h30 que vous n&apos;oublierez pas !
            </p>
            <ul className="space-y-2">
              {['2h30 d\'expérience', 'Repartez avec vos créations', '2 à 6 participants', '45€/personne'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-warm-gray">
                  <span className="w-1.5 h-1.5 rounded-full bg-berry flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-light-border p-8">
              <h2 className="font-serif text-2xl font-bold text-anthracite mb-8">
                Choisir un créneau
              </h2>
              <BookingCalendar />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-anthracite rounded-3xl p-6 text-cream">
              <h3 className="font-serif text-lg font-semibold mb-4">Notre adresse</h3>
              <p className="text-warm-gray text-sm leading-relaxed">
                Les Délices de Flore
                <br />
                12 chemin des Oliviers
                <br />
                84000 Avignon
                <br />
                Provence, France
              </p>
              <div className="mt-4 pt-4 border-t border-warm-gray/20">
                <h4 className="text-sm font-semibold text-cream mb-2">Horaires</h4>
                <div className="space-y-1 text-warm-gray text-xs">
                  <div className="flex justify-between">
                    <span>Lundi — Vendredi</span>
                    <span>09h — 17h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span>10h — 16h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="text-red-400">Fermé</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-apricot-light/40 rounded-3xl p-6 border border-apricot/30">
              <h3 className="font-serif text-lg font-semibold text-anthracite mb-3">
                Besoin d&apos;aide ?
              </h3>
              <p className="text-warm-gray text-sm leading-relaxed mb-4">
                Pour toute question sur nos ateliers ou vos réservations, n&apos;hésitez pas à nous
                contacter.
              </p>
              <a
                href="tel:+33490123456"
                className="text-berry font-medium text-sm hover:underline block mb-1"
              >
                +33 (0)4 90 12 34 56
              </a>
              <a
                href="mailto:contact@lesdelicesdeflore.fr"
                className="text-berry font-medium text-sm hover:underline block"
              >
                contact@lesdelicesdeflore.fr
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-anthracite text-center mb-10">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details
                key={item.question}
                className="bg-white rounded-2xl border border-light-border group open:border-berry/30 transition-all duration-200"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                  <span className="font-semibold text-anthracite text-sm">{item.question}</span>
                  <ChevronDown className="w-4 h-4 text-warm-gray group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-warm-gray text-sm leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
