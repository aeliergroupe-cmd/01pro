'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { staggerContainer, fadeUp } from '@/styles/motion';
import { MOCK_PRODUCTS } from '@/lib/vendure/mock-data';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

interface CartEmptyProps {
  onClose: () => void;
}

const SUGGESTED = MOCK_PRODUCTS.slice(0, 2);

export function CartEmpty({ onClose }: CartEmptyProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center px-6 py-12"
    >
      <motion.div variants={fadeUp} className="text-border-strong mb-6">
        <ShoppingBag size={40} strokeWidth={0.8} />
      </motion.div>

      <motion.h3 variants={fadeUp} className="font-serif text-xl font-light text-foreground mb-2">
        Your cart is empty
      </motion.h3>
      <motion.p variants={fadeUp} className="text-sm text-muted-foreground text-center mb-8">
        Discover exceptional pieces crafted for the considered wardrobe.
      </motion.p>

      <motion.div variants={fadeUp} className="w-full">
        <Link
          href="/shop"
          onClick={onClose}
          className="block w-full h-12 flex items-center justify-center bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300"
        >
          Explore the Collection
        </Link>
      </motion.div>

      {/* Suggested */}
      {SUGGESTED.length > 0 && (
        <motion.div variants={fadeUp} className="mt-10 w-full">
          <p className="text-label-luxury text-muted-foreground mb-4">You May Also Appreciate</p>
          <div className="space-y-4">
            {SUGGESTED.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 group"
              >
                <div className="relative w-16 aspect-fashion bg-surface overflow-hidden flex-none">
                  {product.featuredAsset && (
                    <Image
                      src={product.featuredAsset.preview}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="64px"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-serif text-sm font-light text-foreground group-hover:text-accent transition-colors duration-200 leading-snug truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground tabular-nums mt-0.5">
                    {formatPrice(product.variants[0]?.priceWithTax ?? 0, 'EUR')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
