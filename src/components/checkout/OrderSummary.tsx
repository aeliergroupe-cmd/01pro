'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export function OrderSummary() {
  const cart = useCartStore((s) => s.cart);
  const lines = cart?.lines ?? [];
  const totalWithTax = cart?.totalWithTax ?? 0;
  const subTotalWithTax = cart?.subTotalWithTax ?? 0;

  const shipping = 0;
  const tax = Math.round(totalWithTax * 0.2 / 1.2);

  return (
    <div className="lg:sticky lg:top-8 lg:self-start border border-border p-6">
      <p className="text-label-luxury text-muted-foreground mb-5">Order Summary</p>

      <div className="space-y-4 mb-6 divide-y divide-border">
        {lines.map((line) => (
          <div key={line.id} className="flex items-start gap-4 pt-4 first:pt-0">
            <div className="relative w-16 aspect-fashion bg-surface overflow-hidden flex-none">
              {line.productVariant.product.featuredAsset && (
                <Image
                  src={line.productVariant.product.featuredAsset.preview}
                  alt={line.productVariant.product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              )}
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-muted-foreground text-background text-xs flex items-center justify-center">
                {line.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-light leading-snug">
                {line.productVariant.product.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {line.productVariant.options.map((o) => o.name).join(' · ')}
              </p>
            </div>
            <p className="text-sm text-foreground font-light flex-none">
              {formatPrice(line.linePriceWithTax, 'EUR')}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-light">Subtotal</span>
          <span className="text-foreground">{formatPrice(subTotalWithTax ?? 0, 'EUR')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-light">Shipping</span>
          <span className="text-accent">{shipping === 0 ? 'Free' : formatPrice(shipping, 'EUR')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-light">VAT (20%)</span>
          <span className="text-foreground">{formatPrice(tax, 'EUR')}</span>
        </div>
      </div>

      <div className="border-t border-border mt-4 pt-4 flex justify-between">
        <span className="text-sm text-foreground">Total</span>
        <span className="font-serif text-lg font-light text-accent">
          {formatPrice(totalWithTax, 'EUR')}
        </span>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <ul className="space-y-1">
          {[
            'Free returns within 30 days',
            'Complimentary gift packaging',
            'Discreet delivery',
          ].map((item) => (
            <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent flex-none" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
