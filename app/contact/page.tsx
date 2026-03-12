'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2, Send } from 'lucide-react';

const OPENING_HOURS = [
  { day: 'Lundi — Vendredi', hours: '09h00 — 17h00' },
  { day: 'Samedi', hours: '10h00 — 16h00' },
  { day: 'Dimanche', hours: 'Fermé' },
];

const SUBJECTS = [
  'Question sur un produit',
  'Commande en cours',
  'Retour / Remboursement',
  'Atelier de cuisine',
  'Partenariat',
  'Autre',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json() as { error?: string };
        throw new Error(err.error ?? 'Une erreur est survenue');
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-cream via-sage-light/20 to-apricot-light/20 py-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-berry text-sm font-semibold tracking-widest uppercase">Contact</span>
          <h1 className="section-title mt-2 mb-4">Parlons ensemble</h1>
          <p className="section-subtitle max-w-xl mx-auto">
            Une question, une commande spéciale, ou simplement envie de dire bonjour ? Flore &amp;
            Mathieu vous répondent avec plaisir.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-light-border p-6">
              <h2 className="font-serif text-xl font-semibold text-anthracite mb-5">
                Nos coordonnées
              </h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-berry-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-berry" />
                  </div>
                  <div>
                    <p className="font-medium text-anthracite text-sm mb-0.5">Adresse</p>
                    <p className="text-warm-gray text-sm leading-relaxed">
                      12 chemin des Oliviers
                      <br />
                      84000 Avignon, Provence
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-apricot-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-apricot-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-anthracite text-sm mb-0.5">Téléphone</p>
                    <a
                      href="tel:+33490123456"
                      className="text-warm-gray text-sm hover:text-berry transition-colors"
                    >
                      +33 (0)4 90 12 34 56
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sage-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-sage-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-anthracite text-sm mb-0.5">E-mail</p>
                    <a
                      href="mailto:contact@lesdelicesdeflore.fr"
                      className="text-warm-gray text-sm hover:text-berry transition-colors"
                    >
                      contact@lesdelicesdeflore.fr
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Opening hours */}
            <div className="bg-white rounded-2xl border border-light-border p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-apricot-light rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-apricot-dark" />
                </div>
                <h2 className="font-serif text-xl font-semibold text-anthracite">Horaires</h2>
              </div>
              <div className="space-y-3">
                {OPENING_HOURS.map((item) => (
                  <div key={item.day} className="flex justify-between items-center text-sm">
                    <span className="text-warm-gray">{item.day}</span>
                    <span
                      className={cn(
                        'font-medium',
                        item.hours === 'Fermé' ? 'text-red-400' : 'text-anthracite'
                      )}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-gradient-to-br from-sage-light/40 to-apricot-light/40 rounded-2xl border border-light-border h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-sage-dark mx-auto mb-2" />
                <p className="text-warm-gray text-sm font-medium">Avignon, Provence</p>
                <p className="text-warm-gray text-xs">12 chemin des Oliviers</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-2xl border border-light-border p-12 flex flex-col items-center justify-center text-center min-h-96 animate-scale-in">
                <div className="w-20 h-20 bg-sage-light rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-sage-dark" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-anthracite mb-3">
                  Message envoyé !
                </h2>
                <p className="text-warm-gray text-sm leading-relaxed max-w-sm mb-8">
                  Merci pour votre message ! Flore ou Mathieu vous répondront dans les 24 à 48
                  heures ouvrées.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-light-border p-8">
                <h2 className="font-serif text-2xl font-bold text-anthracite mb-8">
                  Envoyez-nous un message
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label" htmlFor="contact-name">
                        Nom complet *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Marie Dupont"
                        className={cn('input', errors.name && 'border-red-400 focus:ring-red-200')}
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="label" htmlFor="contact-email">
                        E-mail *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="marie@exemple.fr"
                        className={cn('input', errors.email && 'border-red-400 focus:ring-red-200')}
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="contact-subject">
                      Objet *
                    </label>
                    <select
                      id="contact-subject"
                      className={cn('input', errors.subject && 'border-red-400 focus:ring-red-200')}
                      {...register('subject')}
                    >
                      <option value="">Sélectionner un objet...</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label" htmlFor="contact-message">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={6}
                      placeholder="Décrivez votre demande en détail..."
                      className={cn(
                        'input resize-none',
                        errors.message && 'border-red-400 focus:ring-red-200'
                      )}
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                      {serverError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </>
                    )}
                  </button>

                  <p className="text-warm-gray text-xs text-center">
                    Nous vous répondrons dans les 24 à 48 heures ouvrées.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
