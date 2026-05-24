'use server';

import { getServerClient } from '@/lib/vendure/client';
import {
  SET_ORDER_SHIPPING_ADDRESS,
  SET_ORDER_SHIPPING_METHOD,
  SET_CUSTOMER_FOR_ORDER,
  ADD_PAYMENT_TO_ORDER,
  TRANSITION_ORDER_TO_STATE,
} from '@/lib/vendure/mutations/checkout';
import { stripe } from '@/lib/stripe/server';

export async function setShippingAddress(input: {
  fullName: string;
  streetLine1: string;
  streetLine2?: string;
  city: string;
  postalCode: string;
  countryCode: string;
  phoneNumber?: string;
}) {
  const client = await getServerClient();
  return client.request(SET_ORDER_SHIPPING_ADDRESS, { input });
}

export async function setShippingMethod(shippingMethodId: string) {
  const client = await getServerClient();
  return client.request(SET_ORDER_SHIPPING_METHOD, { shippingMethodId: [shippingMethodId] });
}

export async function createPaymentIntent(amount: number, currency: string) {
  const intent = await stripe.paymentIntents.create({
    amount,
    currency: currency.toLowerCase(),
    automatic_payment_methods: { enabled: true },
  });
  return { clientSecret: intent.client_secret };
}

export async function addPaymentToOrder(paymentIntentId: string) {
  const client = await getServerClient();
  return client.request(ADD_PAYMENT_TO_ORDER, {
    input: {
      method: 'stripe',
      metadata: { paymentIntentId },
    },
  });
}

export async function transitionOrderToState(state: string) {
  const client = await getServerClient();
  return client.request(TRANSITION_ORDER_TO_STATE, { state });
}
