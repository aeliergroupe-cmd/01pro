'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { CartItem } from './CartItem';
import { CartEmpty } from './CartEmpty';
import { cartDrawerSlide, overlayReveal } from '@/styles/motion';

export function CartDrawer() {
  const { cart, isOpen, closeCart, isLoading } = useCartStore();
  const lineCount = cart?.totalQuantity ?? 0;
  const subtotal = cart?.subTotalWithTax ?? 0;
  const currency = 'EUR';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayReveal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-40 bg-warm-black/40 backdrop-blur-[2px]"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            variants={cartDrawerSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed right-0 top-0 bottom-0 z-50',
              'w-full sm:w-[420px]',
              'bg-background border-l border-border',
              'flex flex-col',
              'shadow-drawer'
            )}
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
              <div>
                <h2 className="font-serif text-xl font-light text-foreground">
                  Your Cart
                </h2>
                {lineCount > 0 && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {lineCount} {lineCount === 1 ? 'piece' : 'pieces'}
                  </p>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {!cart || cart.lines.length === 0 ? (
                <CartEmpty onClose={closeCart} />
              ) : (
                <div className="px-6 py-4 space-y-0">
                  <AnimatePresence initial={false}>
                    {cart.lines.map((line) => (
                      <CartItem key={line.id} line={line} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart && cart.lines.length > 0 && (
              <div className="px-6 py-6 border-t border-border shrink-0 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-light">Subtotal</span>
                  <span className="font-serif text-xl font-light tabular-nums">
                    {formatPrice(subtotal, currency)}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className={cn(
                    'block w-full h-14 flex items-center justify-center',
                    'bg-foreground text-background',
                    'font-sans text-label-luxury tracking-widest',
                    'hover:bg-accent',
                    'transition-colors duration-300',
                    isLoading && 'opacity-50 pointer-events-none'
                  )}
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="block text-center text-label-luxury text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
