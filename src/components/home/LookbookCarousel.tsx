'use client';

import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeUp } from '@/styles/motion';
import { useIntersection } from '@/hooks/useIntersection';
import { MOCK_PRODUCTS } from '@/lib/vendure/mock-data';
import { formatPrice } from '@/lib/utils';

const LOOKBOOK_ITEMS = MOCK_PRODUCTS.slice(0, 6).map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  image: p.featuredAsset?.preview ?? '',
  price: p.variants[0]?.priceWithTax ?? 0,
  currency: p.variants[0]?.currencyCode ?? 'EUR',
  category: p.facetValues[0]?.name ?? '',
}));

export function LookbookCarousel() {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section-padding">
      {/* Header */}
      <div className="gutter-x max-w-screen-xl mx-auto mb-10">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="flex items-end justify-between"
        >
          <div>
            <motion.span variants={fadeUp} className="text-label-luxury text-muted-foreground mb-3 block">
              The Lookbook
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-title-lg font-light">
              Current
              <em className="italic"> Season</em>
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className={cn(
                'size-10 flex items-center justify-center',
                'border border-border text-muted-foreground',
                'hover:border-foreground hover:text-foreground',
                'transition-colors duration-200'
              )}
              aria-label="Previous product"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={scrollNext}
              className={cn(
                'size-10 flex items-center justify-center',
                'border border-border text-muted-foreground',
                'hover:border-foreground hover:text-foreground',
                'transition-colors duration-200'
              )}
              aria-label="Next product"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden pl-[var(--space-gutter)]">
        <div className="flex gap-4 touch-pan-y">
          {LOOKBOOK_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                'flex-none',
                'w-[calc(50vw-2rem)] sm:w-[calc(33vw-2rem)] lg:w-[calc(25vw-2rem)]',
                'max-w-[340px]'
              )}
            >
              <Link href={`/products/${item.slug}`} className="group block">
                {/* Image */}
                <div className="relative aspect-fashion overflow-hidden mb-4 bg-surface">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}
                </div>

                {/* Info */}
                <div>
                  <p className="text-label-luxury text-muted-foreground mb-1.5">{item.category}</p>
                  <h3 className="font-serif text-lg font-light text-foreground group-hover:text-accent transition-colors duration-200 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1.5 tabular-nums">
                    {formatPrice(item.price, item.currency)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
