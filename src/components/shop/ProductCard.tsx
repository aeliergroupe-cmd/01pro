'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import type { ProductSearchResult } from '@/types/product';

interface ProductCardProps {
  product: ProductSearchResult;
  priority?: boolean;
  onQuickView?: (productId: string) => void;
}

function getPriceDisplay(price: ProductSearchResult['priceWithTax'], currency: string): string {
  if ('value' in price) return formatPrice(price.value, currency);
  return `From ${formatPrice(price.min, currency)}`;
}

export function ProductCard({ product, priority = false, onQuickView }: ProductCardProps) {
  const imageUrl = product.productAsset?.preview;
  const priceDisplay = getPriceDisplay(product.priceWithTax, product.currencyCode);

  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-fashion overflow-hidden bg-surface mb-4">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.productName}
              fill
              priority={priority}
              className="object-cover transition-transform duration-1000 ease-[var(--ease-luxury)] group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-surface-raised" />
          )}

          {/* Hover actions */}
          <div
            className={cn(
              'absolute inset-x-0 bottom-0 p-4',
              'flex items-end justify-between',
              'opacity-0 group-hover:opacity-100',
              'translate-y-2 group-hover:translate-y-0',
              'transition-all duration-300'
            )}
          >
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(product.productId);
                }}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2',
                  'bg-background/90 backdrop-blur-sm text-foreground',
                  'text-[10px] uppercase tracking-widest font-medium font-sans',
                  'hover:bg-accent hover:text-accent-foreground',
                  'transition-colors duration-200'
                )}
              >
                <Eye size={12} />
                Quick View
              </button>
            )}

            <button
              onClick={(e) => e.preventDefault()}
              className={cn(
                'size-9 flex items-center justify-center',
                'bg-background/90 backdrop-blur-sm',
                'text-muted-foreground hover:text-foreground',
                'transition-colors duration-200 ml-auto'
              )}
              aria-label={`Add ${product.productName} to wishlist`}
            >
              <Heart size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <p className="text-label-luxury text-muted-foreground">
            {product.collectionIds.length > 0 ? 'ATELIER GROUPE' : 'Ready to Wear'}
          </p>
          <h3 className="font-serif text-lg font-light text-foreground group-hover:text-accent transition-colors duration-200 leading-snug">
            {product.productName}
          </h3>
          <p className="text-sm text-muted-foreground tabular-nums">{priceDisplay}</p>
        </div>
      </Link>
    </motion.article>
  );
}
