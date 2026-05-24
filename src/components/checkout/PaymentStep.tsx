'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface PaymentStepProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function PaymentStep({ onSuccess, onBack }: PaymentStepProps) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // In production: integrate Stripe Elements
    await new Promise((r) => setTimeout(r, 1500));
    onSuccess();
  }

  const inputClass = cn(
    'w-full h-12 px-4 bg-transparent border border-border',
    'text-sm text-foreground font-light font-mono',
    'focus:outline-none focus:border-foreground transition-colors duration-200',
    'placeholder:text-muted-foreground/50 placeholder:font-sans'
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-light">Payment</h2>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock size={12} />
          <span>256-bit SSL encryption</span>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label htmlFor="nameOnCard" className="text-label-luxury text-foreground block mb-2">
            Name on Card
          </label>
          <input
            id="nameOnCard"
            type="text"
            required
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            className={cn(inputClass, 'font-sans')}
            placeholder="Jean Dupont"
          />
        </div>

        <div>
          <label htmlFor="cardNumber" className="text-label-luxury text-foreground block mb-2">
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            required
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            className={inputClass}
            placeholder="4242 4242 4242 4242"
            maxLength={19}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiry" className="text-label-luxury text-foreground block mb-2">
              Expiry
            </label>
            <input
              id="expiry"
              type="text"
              inputMode="numeric"
              required
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              className={inputClass}
              placeholder="MM/YY"
              maxLength={5}
            />
          </div>
          <div>
            <label htmlFor="cvc" className="text-label-luxury text-foreground block mb-2">
              CVC
            </label>
            <input
              id="cvc"
              type="text"
              inputMode="numeric"
              required
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className={inputClass}
              placeholder="•••"
              maxLength={4}
            />
          </div>
        </div>
      </div>

      <div className="border border-border p-4 mb-6 bg-surface">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Test card: <span className="font-mono text-foreground">4242 4242 4242 4242</span>, any future
          expiry, any 3-digit CVC. Your card will not be charged in this demo.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className={cn(
            'h-12 px-8 text-label-luxury transition-colors duration-300 flex items-center gap-2',
            !loading
              ? 'bg-foreground text-background hover:bg-accent'
              : 'bg-surface text-muted-foreground cursor-not-allowed'
          )}
        >
          <Lock size={12} />
          {loading ? 'Processing…' : 'Place Order'}
        </button>
      </div>
    </form>
  );
}
