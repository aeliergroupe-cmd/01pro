import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { MeasurementForm } from '@/components/account/MeasurementForm';

export const metadata: Metadata = genMeta({
  title: 'My Measurements',
  description: 'Manage your tailoring measurements for a perfect fit.',
  path: '/account/measurements',
});

export default function MeasurementsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-light mb-2">Tailoring Measurements</h1>
        <p className="text-sm text-muted-foreground">
          Your measurements are securely stored and used to ensure perfect fit across all garments.
        </p>
      </div>
      <MeasurementForm />
    </div>
  );
}
