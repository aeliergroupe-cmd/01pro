'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

interface AddToCartButtonProps {
  variantId: string | null;
  productName: string;
  imageUrl?: string;
  price?: number;
  disabled?: boolean;
}

export function AddToCartButton({
  variantId,
  productName,
  imageUrl,
  price,
  disabled = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [state, setState] = useState<'idle' | 'loading' | 'added'>('idle');

  const isDisabled = disabled || !variantId || state !== 'idle';

  async function handleAddToCart() {
    if (!variantId || state !== 'idle') return;

    setState('loading');

    await addItem(variantId, 1, {
      id: `optimistic-${Date.now()}`,
      quantity: 1,
      unitPriceWithTax: price ?? 0,
      linePriceWithTax: price ?? 0,
      productVariant: {
        id: variantId,
        name: '',
        sku: '',
        product: {
          id: '',
          name: productName,
          slug: '',
          featuredAsset: imageUrl ? { id: '', preview: imageUrl } : null,
        },
        options: [],
      },
    });

    setState('added');
    setTimeout(() => setState('idle'), 2500);
  }

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={isDisabled}
      whileHover={!isDisabled ? { y: -1 } : undefined}
      whileTap={!isDisabled ? { y: 0 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'w-full h-14 flex items-center justify-center gap-3',
        'font-sans text-label-luxury tracking-widest',
        'border transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2',
        state === 'added'
          ? 'bg-foreground border-foreground text-background'
          : isDisabled && !variantId
          ? 'bg-surface border-border text-muted-foreground cursor-not-allowed'
          : 'bg-foreground border-foreground text-background hover:bg-accent hover:border-accent'
      )}
      aria-label={
        !variantId
          ? 'Select a size to add to cart'
          : state === 'added'
          ? `${productName} added to cart`
          : `Add ${productName} to cart`
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {state === 'loading' && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <span className="size-4 rounded-full border border-current border-t-transparent animate-spin" />
            Adding…
          </motion.span>
        )}
        {state === 'added' && (
          <motion.span
            key="added"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Check size={15} strokeWidth={2} />
            Added to Cart
          </motion.span>
        )}
        {state === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            {!variantId ? (
              'Select a Size'
            ) : (
              <>
                <ShoppingBag size={15} strokeWidth={1.5} />
                Add to Cart
              </>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
