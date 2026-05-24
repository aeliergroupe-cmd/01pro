'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import type { CartLine } from '@/types/product';

interface CartItemProps {
  line: CartLine;
}

export function CartItem({ line }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();
  const image = line.productVariant.product.featuredAsset?.preview;
  const slug = line.productVariant.product.slug;
  const sizeOption = line.productVariant.options[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 py-5 border-b border-border last:border-0"
    >
      {/* Image */}
      <Link
        href={`/products/${slug}`}
        className="relative flex-none w-20 aspect-fashion overflow-hidden bg-surface"
      >
        {image && (
          <Image
            src={image}
            alt={line.productVariant.product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/products/${slug}`}
              className="font-serif text-base font-light text-foreground leading-snug hover:text-accent transition-colors duration-200 block"
            >
              {line.productVariant.product.name}
            </Link>
            {sizeOption && (
              <p className="text-xs text-muted-foreground mt-1">
                Size: {sizeOption.name}
              </p>
            )}
          </div>
          <button
            onClick={() => removeItem(line.id)}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0 mt-0.5"
            aria-label={`Remove ${line.productVariant.product.name}`}
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Quantity + Price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-border">
            <button
              onClick={() => updateQuantity(line.id, line.quantity - 1)}
              className={cn(
                'size-7 flex items-center justify-center',
                'text-muted-foreground hover:text-foreground',
                'transition-colors duration-200'
              )}
              aria-label="Decrease quantity"
            >
              <Minus size={10} strokeWidth={2} />
            </button>
            <span className="w-8 text-center text-sm tabular-nums font-light">
              {line.quantity}
            </span>
            <button
              onClick={() => updateQuantity(line.id, line.quantity + 1)}
              className={cn(
                'size-7 flex items-center justify-center',
                'text-muted-foreground hover:text-foreground',
                'transition-colors duration-200'
              )}
              aria-label="Increase quantity"
            >
              <Plus size={10} strokeWidth={2} />
            </button>
          </div>

          <span className="text-sm font-light tabular-nums text-foreground">
            {formatPrice(line.linePriceWithTax, 'EUR')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
