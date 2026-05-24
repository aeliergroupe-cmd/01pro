'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeUp, maskReveal, staggerContainer } from '@/styles/motion';
import { useIntersection } from '@/hooks/useIntersection';

const CAMPAIGN_IMAGE =
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1400&auto=format&fit=crop&q=85';

export function EditorialCampaign() {
  const { ref: textRef, isVisible: textVisible } = useIntersection({ threshold: 0.2 });
  const { ref: imgRef, isVisible: imgVisible } = useIntersection({ threshold: 0.1 });

  return (
    <section className="section-padding gutter-x">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            ref={textRef}
            variants={staggerContainer}
            initial="hidden"
            animate={textVisible ? 'visible' : 'hidden'}
            className="order-2 lg:order-1"
          >
            <motion.span variants={fadeUp} className="text-label-luxury text-muted-foreground mb-6 block">
              Campaign — Spring 2025
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-headline font-light leading-tight mb-8"
            >
              A Story of
              <br />
              <em className="italic">Light &amp; Tailoring</em>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground font-light leading-relaxed mb-4 max-w-lg"
            >
              Shot over three days in the hills above Portofino, our new campaign explores
              the relationship between architecture, landscape, and the perfectly considered garment.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground font-light leading-relaxed mb-10 max-w-lg"
            >
              Photographer Élise Moreau brought her characteristic restraint — each frame composed
              with the precision of a still life. The garments were not placed; they arrived.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="/journal/a-story-of-light-and-tailoring"
                className={cn(
                  'inline-flex items-center gap-2',
                  'text-label-luxury text-foreground',
                  'border-b border-foreground pb-0.5',
                  'hover:text-accent hover:border-accent',
                  'transition-colors duration-300 group'
                )}
              >
                Read the Campaign Story
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Campaign Image */}
          <motion.div
            ref={imgRef}
            variants={maskReveal}
            initial="hidden"
            animate={imgVisible ? 'visible' : 'hidden'}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={CAMPAIGN_IMAGE}
                alt="ATELIER GROUPE Spring 2025 Campaign — A Story of Light"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Edition badge */}
            <div className="absolute -bottom-6 -left-6 hidden lg:flex items-center justify-center size-28 bg-foreground text-background rounded-full">
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-[0.15em] text-background/60 mb-0.5">Edition</p>
                <p className="font-serif text-2xl font-light leading-none">S/S</p>
                <p className="text-[9px] uppercase tracking-[0.15em] text-background/60 mt-0.5">2025</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
