'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ATELIERS } from '@/lib/constants';
import { useRouter } from 'next/navigation';

const SERVICES = [
  {
    id: 'fitting',
    name: 'Fitting Appointment',
    description: 'For existing purchases or alterations. 45 minutes.',
    duration: 45,
  },
  {
    id: 'consultation',
    name: 'Style Consultation',
    description: 'Discuss your wardrobe needs with a personal advisor. 60 minutes.',
    duration: 60,
  },
  {
    id: 'bespoke',
    name: 'Bespoke Commission',
    description: 'Begin a made-to-measure or bespoke garment. 90 minutes.',
    duration: 90,
  },
  {
    id: 'collection-viewing',
    name: 'Private Collection Viewing',
    description: 'Exclusive access to new arrivals and archive pieces. 60 minutes.',
    duration: 60,
  },
] as const;

const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30', '12:00',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

const STEPS = ['Service', 'Location', 'Date & Time', 'Details'];

interface BookingState {
  service: string;
  atelier: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

export function AppointmentFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<BookingState>({
    service: '',
    atelier: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });

  function update(field: keyof BookingState, value: string) {
    setBooking((prev) => ({ ...prev, [field]: value }));
  }

  function canAdvance() {
    if (step === 0) return !!booking.service;
    if (step === 1) return !!booking.atelier;
    if (step === 2) return !!booking.date && !!booking.time;
    if (step === 3) return !!booking.firstName && !!booking.lastName && !!booking.email;
    return false;
  }

  async function handleSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push('/appointment/confirmation');
  }

  const inputClass = cn(
    'w-full h-12 px-4 bg-transparent border border-border',
    'text-sm text-foreground font-light',
    'focus:outline-none focus:border-foreground transition-colors duration-200',
    'placeholder:text-muted-foreground/50'
  );

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-12">
      <div>
        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={cn(
                  'flex items-center gap-2',
                  i <= step ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <span
                  className={cn(
                    'w-6 h-6 flex items-center justify-center text-xs border transition-colors duration-200',
                    i < step
                      ? 'bg-foreground text-background border-foreground'
                      : i === step
                      ? 'border-foreground text-foreground'
                      : 'border-border text-muted-foreground'
                  )}
                >
                  {i < step ? '✓' : i + 1}
                </span>
                <span
                  className={cn(
                    'text-label-luxury hidden sm:inline transition-colors',
                    i === step ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={cn('w-8 h-px mx-3 transition-colors', i < step ? 'bg-foreground' : 'bg-border')} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Service */}
        {step === 0 && (
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light mb-6">Select a Service</h2>
            {SERVICES.map((svc) => (
              <button
                key={svc.id}
                type="button"
                onClick={() => update('service', svc.id)}
                className={cn(
                  'w-full text-left border p-5 transition-all duration-200',
                  booking.service === svc.id
                    ? 'border-foreground bg-surface'
                    : 'border-border hover:border-foreground/50'
                )}
              >
                <p className="text-sm text-foreground font-light mb-1">{svc.name}</p>
                <p className="text-xs text-muted-foreground">{svc.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* Step 1: Location */}
        {step === 1 && (
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light mb-6">Choose Location</h2>
            {ATELIERS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => update('atelier', a.id)}
                className={cn(
                  'w-full text-left border p-5 transition-all duration-200',
                  booking.atelier === a.id
                    ? 'border-foreground bg-surface'
                    : 'border-border hover:border-foreground/50'
                )}
              >
                <p className="text-sm text-foreground font-light mb-1">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.address}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.hours}</p>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-xl font-light mb-6">Select Date & Time</h2>
            <div className="mb-6">
              <label htmlFor="date" className="text-label-luxury text-foreground block mb-2">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={booking.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => update('date', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <p className="text-label-luxury text-foreground mb-3">Preferred Time</p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => update('time', slot)}
                    className={cn(
                      'h-10 text-sm font-light border transition-colors duration-200',
                      booking.time === slot
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-transparent text-foreground border-border hover:border-foreground'
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div>
            <h2 className="font-serif text-xl font-light mb-6">Your Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="text-label-luxury text-foreground block mb-2">First Name</label>
                  <input id="firstName" type="text" value={booking.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass} placeholder="Jean" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-label-luxury text-foreground block mb-2">Last Name</label>
                  <input id="lastName" type="text" value={booking.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass} placeholder="Dupont" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-label-luxury text-foreground block mb-2">Email</label>
                <input id="email" type="email" value={booking.email} onChange={(e) => update('email', e.target.value)} className={inputClass} placeholder="your@email.com" required />
              </div>
              <div>
                <label htmlFor="phone" className="text-label-luxury text-foreground block mb-2">Phone (optional)</label>
                <input id="phone" type="tel" value={booking.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} placeholder="+33 6 00 00 00 00" />
              </div>
              <div>
                <label htmlFor="notes" className="text-label-luxury text-foreground block mb-2">Notes (optional)</label>
                <textarea
                  id="notes"
                  rows={3}
                  value={booking.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  placeholder="Any specific requirements or garments to discuss…"
                  className={cn(inputClass, 'h-auto py-3 resize-none')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canAdvance()}
              className={cn(
                'h-12 px-8 text-label-luxury transition-colors duration-300',
                canAdvance()
                  ? 'bg-foreground text-background hover:bg-accent'
                  : 'bg-surface text-muted-foreground cursor-not-allowed'
              )}
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canAdvance() || loading}
              className={cn(
                'h-12 px-8 text-label-luxury transition-colors duration-300',
                canAdvance() && !loading
                  ? 'bg-foreground text-background hover:bg-accent'
                  : 'bg-surface text-muted-foreground cursor-not-allowed'
              )}
            >
              {loading ? 'Confirming…' : 'Confirm Appointment'}
            </button>
          )}
        </div>
      </div>

      {/* Summary sidebar */}
      <div className="lg:sticky lg:top-24 lg:self-start border border-border p-6">
        <p className="text-label-luxury text-muted-foreground mb-5">Appointment Summary</p>
        <div className="space-y-4 text-sm">
          {booking.service && (
            <div>
              <span className="text-label-luxury text-muted-foreground block mb-1">Service</span>
              <span className="text-foreground font-light capitalize">
                {SERVICES.find((s) => s.id === booking.service)?.name}
              </span>
            </div>
          )}
          {booking.atelier && (
            <div>
              <span className="text-label-luxury text-muted-foreground block mb-1">Location</span>
              <span className="text-foreground font-light">
                {ATELIERS.find((a) => a.id === booking.atelier)?.name}
              </span>
            </div>
          )}
          {booking.date && (
            <div>
              <span className="text-label-luxury text-muted-foreground block mb-1">Date</span>
              <span className="text-foreground font-light">
                {new Date(booking.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          )}
          {booking.time && (
            <div>
              <span className="text-label-luxury text-muted-foreground block mb-1">Time</span>
              <span className="text-foreground font-light">{booking.time}</span>
            </div>
          )}
        </div>

        {!booking.service && (
          <p className="text-xs text-muted-foreground">Select a service to begin.</p>
        )}

        <div className="mt-6 pt-5 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Appointments are complimentary. Confirmation will be sent within one business day.
          </p>
        </div>
      </div>
    </div>
  );
}
