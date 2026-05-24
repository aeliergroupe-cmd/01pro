import { stripe } from './server';
import type Stripe from 'stripe';

export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env['STRIPE_WEBHOOK_SECRET'];
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET environment variable is not set');
  }
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
