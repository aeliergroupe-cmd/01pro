'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import type { ProductSearchResult } from '@/types/product';

interface ProductGridProps {
  products: ProductSearchResult[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  const [quickViewId, setQuickViewId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-fashion bg-surface shimmer" />
            <div className="h-3 w-24 bg-surface shimmer" />
            <div className="h-4 w-40 bg-surface shimmer" />
            <div className="h-3 w-20 bg-surface shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-24"
      >
        <p className="font-serif text-2xl font-light text-muted-foreground mb-4">
          No pieces found
        </p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or explore our full collection.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        layout
        className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product, i) => (
            <ProductCard
              key={product.productId}
              product={product}
              priority={i < 3}
              onQuickView={setQuickViewId}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Quick view placeholder — wired to ProductCardQuickView */}
      {quickViewId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-warm-black/50"
          onClick={() => setQuickViewId(null)}
        >
          <div
            className="bg-background max-w-3xl w-full mx-4 p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-muted-foreground text-sm">
              Quick view for product {quickViewId}
            </p>
            <button
              onClick={() => setQuickViewId(null)}
              className="mt-4 text-label-luxury text-foreground border-b border-foreground"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
