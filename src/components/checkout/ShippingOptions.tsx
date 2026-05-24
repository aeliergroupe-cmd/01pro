'use client';

import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { SHIPPING_METHODS } from '@/lib/constants';

interface ShippingOptionsProps {
  selectedId: string;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ShippingOptions({ selectedId, onSelect, onNext, onBack }: ShippingOptionsProps) {
  return (
    <div>
      <h2 className="font-serif text-xl font-light mb-6">Shipping Method</h2>
      <div className="space-y-3 mb-8">
        {SHIPPING_METHODS.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={cn(
              'w-full text-left border p-5 transition-all duration-200 flex items-center justify-between',
              selectedId === method.id
                ? 'border-foreground bg-surface'
                : 'border-border hover:border-foreground/50'
            )}
          >
            <div>
              <p className="text-sm text-foreground font-light">{method.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
              {method.freeAbove && (
                <p className="text-xs text-accent mt-1">
                  Free on orders over {formatPrice(method.freeAbove, 'EUR')}
                </p>
              )}
            </div>
            <div className="text-sm text-foreground font-light ml-4 flex-none">
              {method.price === 0 ? (
                <span className="text-accent">Free</span>
              ) : (
                formatPrice(method.price, 'EUR')
              )}
            </div>
          </button>
        ))}
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
          type="button"
          onClick={onNext}
          className="h-12 px-8 bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
