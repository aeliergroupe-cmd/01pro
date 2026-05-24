'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeUp } from '@/styles/motion';
import { useIntersection } from '@/hooks/useIntersection';
import { LuxuryDivider } from '@/components/shared/LuxuryDivider';

export function BrandManifesto() {
  const { ref, isVisible } = useIntersection({ threshold: 0.25 });

  return (
    <section className="section-padding gutter-x">
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <LuxuryDivider className="mb-16" />

          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <motion.span
              variants={fadeUp}
              className="text-label-luxury text-muted-foreground mb-10 block"
            >
              The Maison
            </motion.span>

            <motion.blockquote
              variants={fadeUp}
              className={cn(
                'font-serif text-title-lg font-light leading-[1.25]',
                'text-foreground mb-10',
                'tracking-[-0.01em]'
              )}
            >
              "We believe that a garment made with care, from materials
              honestly sourced and constructed with precision, is not merely
              clothing. It is an{' '}
              <em className="italic text-accent">argument for endurance</em>{' '}
              in an era of disposability."
            </motion.blockquote>

            <motion.div variants={fadeUp} className="flex flex-col items-center gap-1">
              <span className="font-serif text-lg font-light text-foreground">
                Édouard Fontaine
              </span>
              <span className="text-label-luxury text-muted-foreground">
                Creative Director, ATELIER GROUPE
              </span>
            </motion.div>
          </motion.div>

          <LuxuryDivider className="mt-16" />
        </div>
      </div>
    </section>
  );
}
