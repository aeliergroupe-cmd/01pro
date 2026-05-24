'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { maskReveal } from '@/styles/motion';
import { useIntersection } from '@/hooks/useIntersection';

interface ImageWithRevealProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  wrapperClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  delay?: number;
}

export function ImageWithReveal({
  src,
  alt,
  fill = false,
  width,
  height,
  priority = false,
  className,
  wrapperClassName,
  objectFit = 'cover',
  delay = 0,
}: ImageWithRevealProps) {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={maskReveal}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={cn('overflow-hidden', wrapperClassName)}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        className={cn(
          'transition-transform duration-1000',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill',
          className
        )}
      />
    </motion.div>
  );
}
