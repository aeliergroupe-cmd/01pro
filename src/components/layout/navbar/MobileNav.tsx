'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mobileNavSlide, staggerContainer, fadeUp } from '@/styles/motion';
import { NAV_LINKS, NAV_CATEGORIES } from '@/lib/constants';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

interface MobileNavProps {
  onClose: () => void;
}

export function MobileNav({ onClose }: MobileNavProps) {
  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 z-50 bg-warm-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        className={cn(
          'fixed top-0 left-0 bottom-0 z-50',
          'w-[min(360px,90vw)]',
          'bg-[var(--nav-bg-solid)] border-r border-border',
          'flex flex-col overflow-y-auto'
        )}
        variants={mobileNavSlide}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border shrink-0">
          <Link
            href="/"
            onClick={onClose}
            className="font-serif font-light text-base tracking-[0.2em] uppercase"
          >
            Atelier Groupe
          </Link>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close navigation"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Main Navigation */}
        <motion.nav
          className="flex-1 px-6 py-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.ul variants={staggerContainer} className="space-y-1 mb-10">
            {NAV_LINKS.map(({ label, href }) => (
              <motion.li key={label} variants={fadeUp}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center justify-between',
                    'py-3 border-b border-border/60',
                    'font-serif text-2xl font-light text-foreground',
                    'hover:text-accent transition-colors duration-200'
                  )}
                >
                  {label}
                  <ChevronRight size={16} className="text-muted-foreground" />
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp}>
            <p className="text-label-luxury text-muted-foreground mb-4">Categories</p>
            <ul className="space-y-2">
              {NAV_CATEGORIES.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className="text-sm text-foreground-secondary hover:text-foreground transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.nav>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-border shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4">
              <Link
                href="/account"
                onClick={onClose}
                className="text-label-luxury text-muted-foreground hover:text-foreground transition-colors"
              >
                Account
              </Link>
              <Link
                href="/appointment"
                onClick={onClose}
                className="text-label-luxury text-muted-foreground hover:text-foreground transition-colors"
              >
                Book Appointment
              </Link>
            </div>
            <ThemeToggle />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Paris · Milan · London
          </p>
        </div>
      </motion.div>
    </>
  );
}
