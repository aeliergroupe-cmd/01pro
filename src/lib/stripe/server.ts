import Stripe from 'stripe';

declare global {
  // eslint-disable-next-line no-var
  var _stripe: Stripe | undefined;
}

function createStripeClient(): Stripe {
  const secretKey = process.env['STRIPE_SECRET_KEY'];
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set');
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-02-24.acacia',
  });
}

export const stripe: Stripe =
  process.env['NODE_ENV'] === 'production'
    ? createStripeClient()
    : (globalThis._stripe ?? (globalThis._stripe = createStripeClient()));
