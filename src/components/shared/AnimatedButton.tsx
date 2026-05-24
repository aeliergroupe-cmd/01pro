'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_LUXURY } from '@/styles/motion';
import type { ButtonHTMLAttributes } from 'react';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary:
    'bg-foreground text-background border border-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground',
  secondary:
    'bg-surface text-foreground border border-border hover:border-foreground',
  ghost: 'bg-transparent text-foreground hover:text-accent',
  outline:
    'bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background',
} as const;

const sizes = {
  sm: 'px-5 py-2.5 text-xs tracking-widest',
  md: 'px-8 py-3.5 text-xs tracking-widest',
  lg: 'px-10 py-4.5 text-xs tracking-widest',
} as const;

export function AnimatedButton({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { y: -1 } : undefined}
      whileTap={!disabled && !isLoading ? { y: 0 } : undefined}
      transition={{ duration: 0.2, ease: EASE_LUXURY }}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'font-sans font-medium uppercase tracking-widest',
        'transition-colors duration-300',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-1',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {isLoading ? (
        <>
          <span className="inline-block size-3.5 rounded-full border border-current border-t-transparent animate-spin" />
          <span>Processing</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
