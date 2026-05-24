'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIntersection } from '@/hooks/useIntersection';

interface LuxuryDividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

export function LuxuryDivider({ className, orientation = 'horizontal', label }: LuxuryDividerProps) {
  const { ref, isVisible } = useIntersection({ threshold: 0.5 });

  if (label) {
    return (
      <div ref={ref} className={cn('flex items-center gap-6', className)}>
        <motion.div
          className="h-px flex-1 bg-border"
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ originX: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <span className="text-label-luxury text-muted-foreground shrink-0">{label}</span>
        <motion.div
          className="h-px flex-1 bg-border"
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    );
  }

  if (orientation === 'vertical') {
    return (
      <motion.div
        ref={ref}
        className={cn('w-px bg-border', className)}
        initial={{ scaleY: 0 }}
        animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
        style={{ originY: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      role="separator"
      className={cn('border-none h-px bg-border w-full', className)}
      initial={{ scaleX: 0 }}
      animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
      style={{ originX: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
