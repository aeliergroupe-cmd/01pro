'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeUp, maskReveal } from '@/styles/motion';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=2000&auto=format&fit=crop&q=90';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[600px] flex items-end overflow-hidden"
      aria-label="Hero — ATELIER GROUPE"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        variants={maskReveal}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="relative h-full w-full" style={{ y: imageY }}>
          <Image
            src={HERO_IMAGE}
            alt="ATELIER GROUPE — Modern European Tailoring"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
        </motion.div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm-black/10 via-transparent to-warm-black/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full gutter-x pb-16 lg:pb-24"
        style={{ y: textY, opacity }}
      >
        <motion.div
          className="max-w-screen-xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Season label */}
          <motion.div variants={fadeUp} custom={0}>
            <span className={cn(
              'inline-block text-label-luxury text-ivory/70 mb-6',
              'tracking-[0.2em]'
            )}>
              Spring / Summer 2025
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className={cn(
              'font-serif font-light text-ivory',
              'text-display leading-[0.92] tracking-[-0.025em]',
              'max-w-3xl mb-8'
            )}
          >
            The Atelier
            <br />
            <em className="italic">Collection</em>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="text-ivory/70 font-light text-lg max-w-md mb-10 leading-relaxed"
          >
            Precision tailoring from the ateliers of Naples, Milan, and London.
            Built to endure.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <Link
              href="/collections/atelier-collection"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-3.5',
                'bg-ivory text-warm-black border border-ivory',
                'text-label-luxury font-sans',
                'hover:bg-accent hover:border-accent',
                'transition-colors duration-300'
              )}
            >
              Explore the Collection
            </Link>
            <Link
              href="/appointment"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-3.5',
                'bg-transparent text-ivory border border-ivory/50',
                'text-label-luxury font-sans',
                'hover:border-ivory',
                'transition-colors duration-300'
              )}
            >
              Book an Appointment
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-ivory/40"
        >
          <ArrowDown size={16} strokeWidth={1} />
        </motion.div>
      </motion.div>

      {/* Corner edition marker */}
      <motion.div
        className="absolute top-28 right-[var(--space-gutter)] z-10 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[10px] text-ivory/40 tracking-[0.18em] uppercase [writing-mode:vertical-rl] rotate-180">
          Est. MMXXIV — Paris
        </span>
      </motion.div>
    </section>
  );
}
