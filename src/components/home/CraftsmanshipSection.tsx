'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeUp, maskReveal } from '@/styles/motion';
import { useIntersection } from '@/hooks/useIntersection';

const CRAFT_IMAGE =
  'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=1200&auto=format&fit=crop&q=85';

const CRAFT_PILLARS = [
  {
    number: '01',
    title: 'The Cloth',
    body: 'We source exclusively from mills whose standards match our own — Loro Piana, Zegna, Scabal, and independent Biella producers with generations of expertise.',
  },
  {
    number: '02',
    title: 'The Construction',
    body: 'Full canvas, hand-padded lapels, surgeon\'s cuff buttonholes. Construction details that matter not in photographs but in the wearing — across decades.',
  },
  {
    number: '03',
    title: 'The Fit',
    body: 'Every ready-to-wear piece is offered in three silhouettes. Our made-to-measure service begins with twenty-three precise measurements.',
  },
];

export function CraftsmanshipSection() {
  const { ref: imgRef, isVisible: imgVisible } = useIntersection({ threshold: 0.1 });
  const { ref: textRef, isVisible: textVisible } = useIntersection({ threshold: 0.1 });

  return (
    <section className="section-padding gutter-x bg-surface-raised">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <motion.div
            ref={imgRef}
            variants={maskReveal}
            initial="hidden"
            animate={imgVisible ? 'visible' : 'hidden'}
            className="sticky top-24 hidden lg:block"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={CRAFT_IMAGE}
                alt="ATELIER GROUPE Craftsmanship — Master tailor at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            ref={textRef}
            variants={staggerContainer}
            initial="hidden"
            animate={textVisible ? 'visible' : 'hidden'}
          >
            <motion.span variants={fadeUp} className="text-label-luxury text-muted-foreground mb-6 block">
              The Craft
            </motion.span>

            <motion.h2 variants={fadeUp} className="font-serif text-headline font-light mb-12 leading-tight">
              Built the
              <br />
              <em className="italic">Right Way</em>
            </motion.h2>

            {/* Mobile image */}
            <motion.div variants={maskReveal} className="relative aspect-[3/2] overflow-hidden mb-12 lg:hidden">
              <Image src={CRAFT_IMAGE} alt="Craftsmanship" fill className="object-cover" />
            </motion.div>

            <div className="space-y-10">
              {CRAFT_PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.number}
                  variants={fadeUp}
                  custom={i}
                  className="grid grid-cols-[2.5rem_1fr] gap-6 items-start"
                >
                  <span className="font-serif text-lg text-muted-foreground/50 pt-0.5">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-light text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-14">
              <Link
                href="/about"
                className={cn(
                  'inline-flex items-center gap-2',
                  'text-label-luxury text-foreground',
                  'border-b border-foreground pb-0.5',
                  'hover:text-accent hover:border-accent',
                  'transition-colors duration-300'
                )}
              >
                Learn About the Maison
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
