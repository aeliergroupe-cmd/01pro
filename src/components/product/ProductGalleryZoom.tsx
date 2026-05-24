'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductAsset } from '@/types/product';
import { overlayReveal, dialogReveal } from '@/styles/motion';

interface ProductGalleryZoomProps {
  assets: ProductAsset[];
  initialIndex: number;
  productName: string;
  onClose: () => void;
}

export function ProductGalleryZoom({
  assets,
  initialIndex,
  productName,
  onClose,
}: ProductGalleryZoomProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % assets.length) + assets.length) % assets.length);
    },
    [assets.length]
  );

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [activeIndex, goTo, onClose]);

  const currentAsset = assets[activeIndex];
  if (!currentAsset) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      variants={overlayReveal}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-warm-black/95"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Close */}
      <button
        onClick={onClose}
        className={cn(
          'absolute top-6 right-6 z-10',
          'size-10 flex items-center justify-center',
          'text-ivory/60 hover:text-ivory',
          'border border-ivory/20 hover:border-ivory/50',
          'transition-colors duration-200'
        )}
        aria-label="Close zoom view"
      >
        <X size={18} strokeWidth={1.5} />
      </button>

      {/* Image */}
      <motion.div
        key={activeIndex}
        variants={dialogReveal}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative z-10 max-w-[90vw] max-h-[90vh] w-full"
      >
        <div className="relative" style={{ height: '88vh', maxWidth: 'min(700px, 90vw)', margin: '0 auto' }}>
          <Image
            src={currentAsset.preview.replace('w=900', 'w=1800')}
            alt={currentAsset.alt ?? `${productName} — zoomed view ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="90vw"
            quality={95}
          />
        </div>
      </motion.div>

      {/* Navigation */}
      {assets.length > 1 && (
        <>
          <button
            onClick={() => goTo(activeIndex - 1)}
            className={cn(
              'absolute left-6 top-1/2 -translate-y-1/2 z-10',
              'size-12 flex items-center justify-center',
              'text-ivory/60 hover:text-ivory',
              'border border-ivory/20 hover:border-ivory/50',
              'transition-colors duration-200'
            )}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            className={cn(
              'absolute right-6 top-1/2 -translate-y-1/2 z-10',
              'size-12 flex items-center justify-center',
              'text-ivory/60 hover:text-ivory',
              'border border-ivory/20 hover:border-ivory/50',
              'transition-colors duration-200'
            )}
            aria-label="Next image"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <span className="text-ivory/40 text-xs tabular-nums">
              {activeIndex + 1} / {assets.length}
            </span>
          </div>
        </>
      )}
    </motion.div>
  );
}
