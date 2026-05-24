import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export const metadata: Metadata = genMeta({
  title: 'Checkout',
  description: 'Complete your ATELIER GROUPE order.',
  path: '/checkout',
});

export default function CheckoutPage() {
  return <CheckoutForm />;
}
