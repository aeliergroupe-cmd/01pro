'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MarqueeTextProps {
  text?: string;
  items?: string[];
  separator?: string;
  className?: string;
  speed?: number;
  inverted?: boolean;
}

const DEFAULT_ITEMS = [
  'Crafted in Naples',
  'Super 150s Wool',
  'Atelier Groupe',
  'Biella Cashmere',
  'Made to Endure',
  'Sea Island Cotton',
  'Paris · Milan · London',
  'Est. MMXXIV',
];

export function MarqueeText({
  items = DEFAULT_ITEMS,
  separator = '·',
  className,
  speed = 36,
  inverted = false,
}: MarqueeTextProps) {
  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <div
      className={cn(
        'overflow-hidden',
        inverted ? 'bg-foreground text-background' : 'bg-surface-raised border-y border-border',
        className
      )}
      aria-hidden="true"
    >
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: '-50%' }}
        transition={{
          x: { duration: speed, repeat: Infinity, ease: 'linear' },
        }}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            className={cn(
              'inline-flex items-center gap-6 px-6 py-4',
              'text-label-luxury',
              inverted ? 'text-background/70' : 'text-muted-foreground'
            )}
          >
            <span>{item}</span>
            <span
              className={cn(
                'text-xs',
                inverted ? 'text-background/30' : 'text-border-strong'
              )}
            >
              {separator}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
