import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { MOCK_APPOINTMENTS } from '@/lib/vendure/mock-data';
import { CalendarDays, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = genMeta({
  title: 'My Appointments',
  description: 'Manage your atelier appointments.',
  path: '/account/appointments',
});

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'text-green-600',
  pending: 'text-amber-600',
  cancelled: 'text-red-500',
  completed: 'text-muted-foreground',
};

export default function AppointmentsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-light">Appointments</h1>
        <Link
          href="/appointment"
          className="flex items-center gap-2 text-label-luxury text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus size={14} />
          Book New
        </Link>
      </div>

      {MOCK_APPOINTMENTS.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <CalendarDays size={32} strokeWidth={0.8} className="mx-auto mb-4 text-muted-foreground" />
          <p className="font-serif text-xl font-light mb-2">No appointments</p>
          <p className="text-sm text-muted-foreground mb-6">
            Schedule a fitting or consultation at one of our ateliers.
          </p>
          <Link
            href="/appointment"
            className="inline-flex h-12 px-8 items-center bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300"
          >
            Book an Appointment
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK_APPOINTMENTS.map((appt) => (
            <div key={appt.id} className="border border-border p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-label-luxury text-accent capitalize block mb-1">
                    {appt.type.replace('-', ' ')}
                  </span>
                  <p className="font-serif text-lg font-light">{appt.atelier}</p>
                </div>
                <span className={cn('text-label-luxury capitalize', STATUS_STYLES[appt.status] ?? 'text-muted-foreground')}>
                  {appt.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(appt.date)} · {appt.time}
              </p>
              {appt.advisorName && (
                <p className="text-xs text-muted-foreground mt-1">With {appt.advisorName}</p>
              )}
              {appt.notes && (
                <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border italic">
                  {appt.notes}
                </p>
              )}
              {appt.status === 'confirmed' && (
                <div className="mt-4 pt-3 border-t border-border flex gap-4">
                  <button type="button" className="text-xs text-foreground hover:text-accent transition-colors">
                    Reschedule
                  </button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-red-500 transition-colors">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
