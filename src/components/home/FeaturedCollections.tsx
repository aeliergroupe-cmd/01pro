'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeUp, maskReveal } from '@/styles/motion';
import { useIntersection } from '@/hooks/useIntersection';
import { MOCK_COLLECTIONS } from '@/lib/vendure/mock-data';

export function FeaturedCollections() {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });
  const collections = MOCK_COLLECTIONS;

  return (
    <section className="section-padding gutter-x bg-surface">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <motion.span variants={fadeUp} className="text-label-luxury text-muted-foreground mb-3 block">
              Collections
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-title-lg font-light">
              The Current
              <em className="italic"> Wardrobe</em>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/shop"
              className="text-label-luxury text-muted-foreground hover:text-foreground transition-colors duration-200 border-b border-muted-foreground/40 pb-0.5"
            >
              View All Collections
            </Link>
          </motion.div>
        </motion.div>

        {/* Grid — 2 large + 2 small */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
              large={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CollectionCardProps {
  collection: (typeof MOCK_COLLECTIONS)[number];
  index: number;
  large?: boolean;
}

function CollectionCard({ collection, index, large = false }: CollectionCardProps) {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={maskReveal}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className={cn(large ? 'col-span-2 lg:col-span-2' : 'col-span-1')}
    >
      <Link href={`/collections/${collection.slug}`} className="group block">
        <div
          className={cn(
            'relative overflow-hidden',
            large ? 'aspect-[4/5]' : 'aspect-[3/4]'
          )}
        >
          {collection.featuredAsset && (
            <Image
              src={collection.featuredAsset.preview}
              alt={collection.name}
              fill
              className={cn(
                'object-cover transition-transform duration-1000',
                'group-hover:scale-[1.04]'
              )}
              sizes={large ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'}
            />
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent opacity-80" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
            <p className="text-label-luxury text-ivory/60 mb-2">Collection</p>
            <h3
              className={cn(
                'font-serif font-light text-ivory leading-tight',
                large ? 'text-2xl lg:text-3xl' : 'text-xl'
              )}
            >
              {collection.name}
            </h3>
            <p
              className={cn(
                'text-ivory/60 text-sm mt-2 leading-relaxed',
                'max-w-xs opacity-0 group-hover:opacity-100',
                'translate-y-2 group-hover:translate-y-0',
                'transition-all duration-400'
              )}
            >
              {collection.description.slice(0, 80)}…
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
