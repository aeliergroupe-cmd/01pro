import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export function getStripe(): Promise<Stripe | null> {
  const publishableKey = process.env['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'];
  if (!publishableKey) {
    console.warn('[Stripe] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
    return Promise.resolve(null);
  }
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}
