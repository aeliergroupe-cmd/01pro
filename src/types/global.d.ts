// Global ambient type declarations

declare global {
  interface Window {
    Stripe?: (publishableKey: string) => import('@stripe/stripe-js').Stripe;
  }
}

// Ensure this file is treated as a module
export {};
