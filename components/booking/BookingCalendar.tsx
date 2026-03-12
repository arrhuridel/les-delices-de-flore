'use client';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { fr } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, isBefore, startOfToday, isSunday } from 'date-fns';
import { CalendarIcon, Clock, Users, CheckCircle, Loader2 } from 'lucide-react';
import { bookingSchema, type BookingFormData } from '@/lib/validations';
import { cn } from '@/lib/utils';

// We extend with a Date field client-side (schema uses string for API)
interface BookingFormValues {
  name: string;
  email: string;
  phone?: string;
  date: Date | undefined;
  timeSlot: '09:00' | '10:00' | '11:00' | '14:00' | '15:00' | '16:00';
  type: 'PICKUP' | 'WORKSHOP';
  participants: number;
  message?: string;
}

const TIME_SLOTS = [
  { time: '09:00', label: '09h00' },
  { time: '10:00', label: '10h00' },
  { time: '11:00', label: '11h00' },
  { time: '14:00', label: '14h00' },
  { time: '15:00', label: '15h00' },
  { time: '16:00', label: '16h00' },
];

const BOOKING_TYPES = [
  {
    id: 'PICKUP' as const,
    label: 'Retrait de commande',
    icon: '🛍️',
    description: 'Récupérez votre commande directement à notre atelier',
  },
  {
    id: 'WORKSHOP' as const,
    label: 'Atelier de cuisine',
    icon: '👩‍🍳',
    description: 'Participez à un de nos ateliers de fabrication de confitures',
  },
];

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    defaultValues: {
      type: 'PICKUP',
      participants: 1,
    },
  });

  const selectedType = watch('type');
  const selectedSlot = watch('timeSlot');
  const today = startOfToday();

  const handleDaySelect = async (day: Date | undefined) => {
    setSelectedDate(day);
    setValue('date', day);
    if (day) {
      try {
        const res = await fetch(
          `/api/reservations?date=${format(day, 'yyyy-MM-dd')}`
        );
        if (res.ok) {
          const data = await res.json() as { bookedSlots: string[] };
          setBookedSlots(data.bookedSlots ?? []);
        }
      } catch {
        setBookedSlots([]);
      }
    }
  };

  const isDisabledDay = (day: Date) => {
    return isBefore(day, today) || isSunday(day);
  };

  const onSubmit = async (data: BookingFormValues) => {
    if (!data.date) return;
    setIsLoading(true);
    setError(null);
    try {
      const payload: BookingFormData = {
        ...data,
        date: format(data.date, 'yyyy-MM-dd'),
        timeSlot: data.timeSlot,
        type: data.type,
        participants: data.participants,
      };

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json() as { error?: string };
        throw new Error(err.error ?? 'Une erreur est survenue');
      }

      setSubmitted(true);
      reset();
      setSelectedDate(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-scale-in">
        <div className="w-20 h-20 bg-sage-light rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-sage-dark" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-anthracite mb-3">
          Réservation confirmée !
        </h3>
        <p className="text-warm-gray text-sm max-w-sm leading-relaxed mb-8">
          Nous avons bien reçu votre réservation. Vous recevrez un e-mail de confirmation
          dans les prochaines minutes.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-secondary"
        >
          Faire une nouvelle réservation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Booking type */}
      <div>
        <h3 className="font-serif text-xl font-semibold text-anthracite mb-4">
          Type de réservation
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BOOKING_TYPES.map((type) => (
            <label
              key={type.id}
              className={cn(
                'flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200',
                selectedType === type.id
                  ? 'border-berry bg-berry/5'
                  : 'border-light-border bg-white hover:border-berry/40'
              )}
            >
              <input
                type="radio"
                value={type.id}
                className="sr-only"
                {...register('type')}
              />
              <span className="text-2xl mt-0.5" role="img" aria-label={type.label}>
                {type.icon}
              </span>
              <div>
                <span className="font-semibold text-anthracite text-sm">{type.label}</span>
                <p className="text-warm-gray text-xs mt-0.5 leading-relaxed">{type.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div>
        <h3 className="font-serif text-xl font-semibold text-anthracite mb-4 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-berry" />
          Choisir une date
        </h3>
        <div className="bg-white rounded-2xl border border-light-border p-4 inline-block">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDaySelect}
            locale={fr}
            disabled={isDisabledDay}
            fromDate={today}
            modifiersClassNames={{
              selected: '!bg-berry !text-white rounded-full',
              today: 'font-bold text-berry',
              disabled: 'opacity-30 cursor-not-allowed',
            }}
          />
        </div>
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une date</p>
        )}
      </div>

      {/* Time slot */}
      {selectedDate && (
        <div className="animate-slide-up">
          <h3 className="font-serif text-xl font-semibold text-anthracite mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-berry" />
            Choisir un horaire
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {TIME_SLOTS.map((slot) => {
              const isBooked = bookedSlots.includes(slot.time);
              return (
                <label
                  key={slot.time}
                  className={cn(
                    'flex items-center justify-center py-3 rounded-xl border-2 text-sm font-medium cursor-pointer transition-all duration-200',
                    isBooked
                      ? 'border-light-border bg-light-border/50 text-warm-gray cursor-not-allowed line-through'
                      : selectedSlot === slot.time
                      ? 'border-berry bg-berry text-white'
                      : 'border-light-border bg-white text-anthracite hover:border-berry hover:text-berry'
                  )}
                >
                  <input
                    type="radio"
                    value={slot.time}
                    disabled={isBooked}
                    className="sr-only"
                    {...register('timeSlot', { required: true })}
                  />
                  {slot.label}
                </label>
              );
            })}
          </div>
          {errors.timeSlot && (
            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner un horaire</p>
          )}
        </div>
      )}

      {/* Participants (workshops only) */}
      {selectedType === 'WORKSHOP' && (
        <div className="animate-slide-up">
          <h3 className="font-serif text-xl font-semibold text-anthracite mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-berry" />
            Nombre de participants
          </h3>
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <label
                key={n}
                className={cn(
                  'w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-semibold cursor-pointer transition-all',
                  watch('participants') === n
                    ? 'border-berry bg-berry text-white'
                    : 'border-light-border bg-white text-anthracite hover:border-berry'
                )}
              >
                <input
                  type="radio"
                  value={n}
                  className="sr-only"
                  {...register('participants', { valueAsNumber: true })}
                />
                {n}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Contact info */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-semibold text-anthracite">Vos coordonnées</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="booking-name">
              Nom complet *
            </label>
            <input
              id="booking-name"
              type="text"
              placeholder="Marie Dupont"
              className={cn('input', errors.name && 'border-red-400 focus:ring-red-200')}
              {...register('name', { required: 'Nom requis', minLength: 2 })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label" htmlFor="booking-email">
              E-mail *
            </label>
            <input
              id="booking-email"
              type="email"
              placeholder="marie@exemple.fr"
              className={cn('input', errors.email && 'border-red-400 focus:ring-red-200')}
              {...register('email', { required: 'E-mail requis' })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="label" htmlFor="booking-phone">
            Téléphone
          </label>
          <input
            id="booking-phone"
            type="tel"
            placeholder="+33 6 12 34 56 78"
            className="input"
            {...register('phone')}
          />
        </div>

        <div>
          <label className="label" htmlFor="booking-message">
            Message (optionnel)
          </label>
          <textarea
            id="booking-message"
            rows={3}
            placeholder="Informations complémentaires, demandes spéciales..."
            className="input resize-none"
            {...register('message')}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !selectedDate || !selectedSlot}
        className="btn-primary w-full py-4 text-base"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Réservation en cours...
          </>
        ) : (
          'Confirmer la réservation'
        )}
      </button>
    </form>
  );
}
