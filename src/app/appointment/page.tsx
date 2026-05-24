import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { generateMetadata as genMeta } from '@/lib/seo';
import { AppointmentFlow } from '@/components/appointment/AppointmentFlow';

export const metadata: Metadata = genMeta({
  title: 'Book an Appointment',
  description: 'Schedule a fitting or consultation at an ATELIER GROUPE atelier.',
  path: '/appointment',
});

export default function AppointmentPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        <div className="gutter-x py-12 max-w-screen-xl mx-auto">
          <div className="mb-12">
            <span className="text-label-luxury text-muted-foreground block mb-3">Personal Service</span>
            <h1 className="font-serif text-headline font-light">
              Book an <em className="italic">Appointment</em>
            </h1>
            <p className="text-sm text-muted-foreground mt-4 max-w-xl">
              Choose your service, location, and preferred time. Our team will confirm your appointment within one business day.
            </p>
          </div>
          <AppointmentFlow />
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
