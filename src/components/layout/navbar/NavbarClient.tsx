'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { CartIcon } from './CartIcon';
import { MobileNav } from './MobileNav';
import { MegaMenu } from './MegaMenu';
import { NAV_LINKS } from '@/lib/constants';
import { megaMenuReveal } from '@/styles/motion';

interface NavbarClientProps {
  isTransparent?: boolean;
}

export function NavbarClient({ isTransparent = false }: NavbarClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleMenuEnter(label: string) {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    if (label === 'Shop' || label === 'Collections') {
      setActiveMegaMenu(label);
    }
  }

  function handleMenuLeave() {
    megaMenuTimeout.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  }

  function handleMegaMenuEnter() {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
  }

  const isOpaque = scrolled || !isTransparent || mobileOpen;

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'h-16 lg:h-20',
          'transition-all duration-500',
          isOpaque
            ? 'bg-[var(--nav-bg-solid)] border-b border-border shadow-nav'
            : 'bg-transparent border-b border-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex h-full items-center justify-between gutter-x">
          {/* Left — Mobile Menu + Desktop Nav */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-foreground p-1"
              aria-label="Open navigation"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>

            <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <div
                  key={label}
                  onMouseEnter={() => handleMenuEnter(label)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={href}
                    className={cn(
                      'text-label-luxury text-foreground',
                      'hover:text-accent transition-colors duration-200',
                      'relative group'
                    )}
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Center — Wordmark */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-foreground"
            aria-label="ATELIER GROUPE — Return to homepage"
          >
            <span className="font-serif font-light text-lg tracking-[0.22em] uppercase select-none">
              Atelier Groupe
            </span>
          </Link>

          {/* Right — Actions */}
          <div className="flex items-center gap-4">
            <button
              className="hidden md:flex text-foreground hover:text-accent transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <ThemeToggle />
            <CartIcon />
            <Link
              href="/account"
              className="hidden lg:inline-block text-label-luxury text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Account
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mega Menu */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            variants={megaMenuReveal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-20 left-0 right-0 z-40"
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMenuLeave}
          >
            <MegaMenu category={activeMegaMenu} onClose={() => setActiveMegaMenu(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileNav onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
