import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CalendarDays } from 'lucide-react';

export default function AppointmentConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        <div className="gutter-x py-24 max-w-screen-xl mx-auto">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 border border-accent flex items-center justify-center mx-auto mb-8">
              <CalendarDays size={24} strokeWidth={0.8} className="text-accent" />
            </div>
            <span className="text-label-luxury text-accent block mb-3">Appointment Requested</span>
            <h1 className="font-serif text-3xl font-light mb-4">
              We&rsquo;ll Be in <em className="italic">Touch</em>
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Your appointment request has been received. Our team will confirm availability and send a
              calendar invitation to your email within one business day.
            </p>

            <div className="border border-border p-6 text-left mb-8">
              <p className="text-label-luxury text-muted-foreground mb-3">What to Expect</p>
              <ul className="space-y-2 text-sm text-muted-foreground font-light">
                {[
                  'A confirmation email within 24 hours',
                  'Details on how to prepare for your appointment',
                  'Direct contact information for your advisor',
                  'Parking and transport information for your atelier',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent flex-none mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="h-12 px-8 bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300 flex items-center"
              >
                Explore the Collection
              </Link>
              <Link
                href="/"
                className="h-12 px-8 border border-border text-label-luxury text-foreground hover:border-foreground transition-colors duration-300 flex items-center"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
