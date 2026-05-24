'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUp, staggerContainer } from '@/styles/motion';
import { useIntersection } from '@/hooks/useIntersection';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  titleItalic,
  subtitle,
  align = 'left',
  className,
  titleClassName,
}: SectionTitleProps) {
  const { ref, isVisible } = useIntersection({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'right' && 'items-end text-right',
        className
      )}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="text-label-luxury text-muted-foreground tracking-[0.16em]"
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        variants={fadeUp}
        className={cn(
          'text-headline font-serif font-light',
          titleClassName
        )}
      >
        {title}
        {titleItalic && (
          <>
            {' '}
            <em className="not-italic italic">{titleItalic}</em>
          </>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'text-body text-muted-foreground font-light leading-relaxed max-w-xl',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
