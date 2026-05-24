'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductAsset } from '@/types/product';
import { ProductGalleryZoom } from './ProductGalleryZoom';

interface ProductGalleryProps {
  assets: ProductAsset[];
  productName: string;
}

export function ProductGallery({ assets, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % assets.length) + assets.length) % assets.length);
  }, [assets.length]);

  const currentAsset = assets[activeIndex];

  if (!currentAsset) return null;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-4">
        {/* Thumbnails (vertical on desktop) */}
        {assets.length > 1 && (
          <div className="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px]">
            {assets.map((asset, index) => (
              <button
                key={asset.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'relative flex-none',
                  'w-16 h-20 lg:w-full lg:h-24',
                  'overflow-hidden bg-surface',
                  'border transition-colors duration-200',
                  index === activeIndex
                    ? 'border-foreground'
                    : 'border-border hover:border-border-strong'
                )}
                aria-label={`View image ${index + 1} of ${assets.length}`}
              >
                <Image
                  src={asset.preview}
                  alt={asset.alt ?? `${productName} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Image */}
        <div className="order-1 lg:order-2 relative group">
          <div className="relative aspect-[3/4] overflow-hidden bg-surface">
            <Image
              src={currentAsset.preview}
              alt={currentAsset.alt ?? productName}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            {/* Navigation arrows on mobile */}
            {assets.length > 1 && (
              <>
                <button
                  onClick={() => goTo(activeIndex - 1)}
                  className={cn(
                    'absolute left-3 top-1/2 -translate-y-1/2 lg:hidden',
                    'size-10 flex items-center justify-center',
                    'bg-background/80 backdrop-blur-sm',
                    'text-foreground border border-border',
                    'hover:border-foreground transition-colors duration-200'
                  )}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => goTo(activeIndex + 1)}
                  className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2 lg:hidden',
                    'size-10 flex items-center justify-center',
                    'bg-background/80 backdrop-blur-sm',
                    'text-foreground border border-border',
                    'hover:border-foreground transition-colors duration-200'
                  )}
                  aria-label="Next image"
                >
                  <ChevronRight size={16} strokeWidth={1.5} />
                </button>
              </>
            )}

            {/* Zoom trigger */}
            <button
              onClick={() => setIsZoomOpen(true)}
              className={cn(
                'absolute top-4 right-4',
                'size-10 flex items-center justify-center',
                'bg-background/80 backdrop-blur-sm border border-border',
                'text-foreground',
                'opacity-0 group-hover:opacity-100',
                'transition-opacity duration-300'
              )}
              aria-label="Zoom image"
            >
              <ZoomIn size={15} strokeWidth={1.5} />
            </button>
          </div>

          {/* Image counter */}
          {assets.length > 1 && (
            <div className="flex items-center gap-1.5 mt-3 justify-center lg:justify-start">
              {assets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'h-px transition-all duration-300',
                    index === activeIndex
                      ? 'w-8 bg-foreground'
                      : 'w-4 bg-border-strong hover:bg-muted-foreground'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <ProductGalleryZoom
            assets={assets}
            initialIndex={activeIndex}
            productName={productName}
            onClose={() => setIsZoomOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
