'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeUp, maskReveal } from '@/styles/motion';
import { NAV_CATEGORIES, NAV_COLLECTIONS } from '@/lib/constants';

interface MegaMenuProps {
  category: string;
  onClose: () => void;
}

const FEATURED_IMAGE =
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80';

export function MegaMenu({ category, onClose }: MegaMenuProps) {
  const links = category === 'Collections' ? NAV_COLLECTIONS : NAV_CATEGORIES;
  const title = category === 'Collections' ? 'Collections' : 'Shop by Category';

  return (
    <div
      className={cn(
        'bg-[var(--nav-bg-solid)] border-b border-border',
        'shadow-luxury'
      )}
    >
      <div className="gutter-x py-10 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-12 gap-12">
          {/* Column 1 — Links */}
          <motion.div
            className="col-span-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={fadeUp} className="text-label-luxury text-muted-foreground mb-6 block">
              {title}
            </motion.span>
            <ul className="space-y-1">
              {links.map(({ label, href }) => (
                <motion.li key={label} variants={fadeUp}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={cn(
                      'group flex items-center justify-between',
                      'py-2.5 border-b border-border/50',
                      'text-sm font-light text-foreground-secondary',
                      'hover:text-foreground hover:border-border',
                      'transition-colors duration-200'
                    )}
                  >
                    <span>{label}</span>
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0 transition-transform"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/shop"
                onClick={onClose}
                className="text-label-luxury text-accent hover:underline underline-offset-4"
              >
                View All →
              </Link>
            </motion.div>
          </motion.div>

          {/* Column 2 — Featured Image */}
          <motion.div
            className="col-span-4"
            variants={maskReveal}
            initial="hidden"
            animate="visible"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={FEATURED_IMAGE}
                alt="Featured collection"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 30vw, 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-label-luxury text-ivory/80 mb-1">Now Available</p>
                <h3 className="font-serif text-xl font-light text-ivory">The Atelier Collection</h3>
              </div>
            </div>
          </motion.div>

          {/* Column 3 — Editorial Teaser */}
          <motion.div
            className="col-span-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={fadeUp} className="text-label-luxury text-muted-foreground mb-6 block">
              From the Journal
            </motion.span>
            <motion.div variants={fadeUp} className="space-y-6">
              <Link
                href="/journal/art-of-the-perfect-suit"
                onClick={onClose}
                className="group block"
              >
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Tailoring</p>
                <h4 className={cn(
                  'font-serif text-xl font-light text-foreground',
                  'group-hover:text-accent transition-colors duration-200',
                  'leading-snug'
                )}>
                  The Art of the Perfect Suit
                </h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  On construction, cloth, and the pursuit of something that lasts.
                </p>
              </Link>

              <div className="h-px bg-border" />

              <Link
                href="/journal/cashmere-from-inner-mongolia"
                onClick={onClose}
                className="group block"
              >
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Craft</p>
                <h4 className={cn(
                  'font-serif text-xl font-light text-foreground',
                  'group-hover:text-accent transition-colors duration-200',
                  'leading-snug'
                )}>
                  Fabric Stories: Cashmere
                </h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Tracing our finest fibre from plateau to finished cloth.
                </p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
