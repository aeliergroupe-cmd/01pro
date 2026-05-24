'use client';

import { cn } from '@/lib/utils';
import type { ProductVariant } from '@/types/product';

interface SizeSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelect: (variantId: string) => void;
}

export function SizeSelector({ variants, selectedVariantId, onSelect }: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-label-luxury text-foreground">Select Size</span>
        <button className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
          Size Guide
        </button>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {variants.map((variant) => {
          const sizeName = variant.options[0]?.name ?? variant.name;
          const isSelected = variant.id === selectedVariantId;
          const isOutOfStock = variant.stockLevel === 'OUT_OF_STOCK';

          return (
            <button
              key={variant.id}
              onClick={() => !isOutOfStock && onSelect(variant.id)}
              disabled={isOutOfStock}
              className={cn(
                'relative h-11 flex items-center justify-center',
                'text-sm font-light font-sans',
                'border transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
                isSelected
                  ? 'border-foreground bg-foreground text-background'
                  : isOutOfStock
                  ? 'border-border text-muted-foreground/40 cursor-not-allowed'
                  : 'border-border text-foreground hover:border-foreground'
              )}
              aria-label={`Size ${sizeName}${isOutOfStock ? ' — out of stock' : ''}`}
              aria-pressed={isSelected}
            >
              {sizeName}
              {isOutOfStock && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="absolute inset-0 overflow-hidden">
                    <span className="absolute top-1/2 left-0 right-0 h-px bg-muted-foreground/30 rotate-[145deg] origin-center" />
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedVariantId && (
        <p className="mt-2 text-xs text-muted-foreground">
          {variants.find((v) => v.id === selectedVariantId)?.stockLevel === 'LOW_STOCK' && (
            <span className="text-gold">Only a few remaining</span>
          )}
        </p>
      )}
    </div>
  );
}
