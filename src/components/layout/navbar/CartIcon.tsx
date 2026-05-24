'use client';

import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useCartCount } from '@/store/cart';
import { cn } from '@/lib/utils';

export function CartIcon() {
  const count = useCartCount();
  const openCart = useCartStore((s) => s.openCart);

  return (
    <button
      onClick={openCart}
      className={cn(
        'relative flex items-center text-foreground',
        'hover:text-accent transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent'
      )}
      aria-label={`Open cart${count > 0 ? ` — ${count} item${count > 1 ? 's' : ''}` : ''}`}
    >
      <ShoppingBag size={18} strokeWidth={1.5} />

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 400 }}
            className={cn(
              'absolute -top-2 -right-2',
              'size-4 flex items-center justify-center',
              'bg-accent text-accent-foreground',
              'text-[10px] font-medium rounded-full',
              'tabular-nums leading-none'
            )}
          >
            {count > 9 ? '9+' : count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
