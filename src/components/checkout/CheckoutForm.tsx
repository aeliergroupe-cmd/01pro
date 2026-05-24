'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { AddressForm } from './AddressForm';
import { ShippingOptions } from './ShippingOptions';
import { PaymentStep } from './PaymentStep';
import { OrderSummary } from './OrderSummary';

const STEPS = ['Delivery', 'Shipping', 'Payment'] as const;
type Step = (typeof STEPS)[number];

export function CheckoutForm() {
  const router = useRouter();
  const cart = useCartStore((s) => s.cart);
  const [step, setStep] = useState<Step>('Delivery');
  const [address, setAddress] = useState<Record<string, string> | null>(null);
  const [shippingMethodId, setShippingMethodId] = useState<string>('standard');

  const stepIndex = STEPS.indexOf(step);

  function handleAddressSubmit(data: Record<string, string>) {
    setAddress(data);
    setStep('Shipping');
  }

  function handleShippingNext() {
    setStep('Payment');
  }

  async function handlePaymentSuccess() {
    router.push('/checkout/success');
  }

  return (
    <div className="gutter-x py-10 max-w-screen-xl mx-auto">
      <div className="grid lg:grid-cols-[1fr_380px] gap-12">
        <div>
          {/* Step indicator */}
          <div className="flex items-center gap-0 mb-10">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center">
                <span
                  className={cn(
                    'flex items-center gap-2 text-label-luxury transition-colors',
                    i === stepIndex ? 'text-foreground' : i < stepIndex ? 'text-muted-foreground' : 'text-muted-foreground/40'
                  )}
                >
                  <span
                    className={cn(
                      'w-6 h-6 flex items-center justify-center text-xs border',
                      i < stepIndex
                        ? 'bg-foreground text-background border-foreground'
                        : i === stepIndex
                        ? 'border-foreground text-foreground'
                        : 'border-border text-muted-foreground'
                    )}
                  >
                    {i < stepIndex ? '✓' : i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </span>
                {i < STEPS.length - 1 && (
                  <div className={cn('w-8 h-px mx-3', i < stepIndex ? 'bg-foreground' : 'bg-border')} />
                )}
              </div>
            ))}
          </div>

          {step === 'Delivery' && <AddressForm onSubmit={handleAddressSubmit} />}
          {step === 'Shipping' && (
            <ShippingOptions
              selectedId={shippingMethodId}
              onSelect={setShippingMethodId}
              onNext={handleShippingNext}
              onBack={() => setStep('Delivery')}
            />
          )}
          {step === 'Payment' && (
            <PaymentStep
              onSuccess={handlePaymentSuccess}
              onBack={() => setStep('Shipping')}
            />
          )}
        </div>

        {/* Order summary */}
        <OrderSummary />
      </div>
    </div>
  );
}
