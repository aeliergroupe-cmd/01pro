'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeUp } from '@/styles/motion';
import { useIntersection } from '@/hooks/useIntersection';

const BG_IMAGE =
  'https://images.unsplash.com/photo-1490578474895-399ad4ad1195?w=2000&auto=format&fit=crop&q=85';

export function ConciergeCTA() {
  const { ref, isVisible } = useIntersection({ threshold: 0.2 });

  return (
    <section className="section-padding gutter-x" aria-label="Book an atelier appointment">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative overflow-hidden min-h-[500px] flex items-center">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src={BG_IMAGE}
              alt="ATELIER GROUPE Atelier — London Studio"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-warm-black/65" />
          </div>

          {/* Content */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="relative z-10 gutter-x py-20 w-full max-w-3xl mx-auto text-center"
          >
            <motion.span variants={fadeUp} className="text-label-luxury text-ivory/60 mb-6 block">
              The Private Tailoring Experience
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-headline font-light text-ivory leading-tight mb-8"
            >
              Begin Your
              <br />
              <em className="italic">Bespoke Journey</em>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-ivory/70 font-light text-lg max-w-lg mx-auto mb-12 leading-relaxed"
            >
              Meet your client advisor at one of our ateliers in Paris, Milan, or London.
              A conversation, a measurement, and the beginning of something that will last decades.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/appointment"
                className={cn(
                  'inline-flex items-center gap-2 px-10 py-4',
                  'bg-ivory text-warm-black',
                  'text-label-luxury font-sans',
                  'hover:bg-accent',
                  'transition-colors duration-300'
                )}
              >
                Book an Appointment
              </Link>
              <Link
                href="/about"
                className={cn(
                  'inline-flex items-center px-10 py-4',
                  'bg-transparent text-ivory border border-ivory/40',
                  'text-label-luxury font-sans',
                  'hover:border-ivory',
                  'transition-colors duration-300'
                )}
              >
                About the Maison
              </Link>
            </motion.div>

            {/* Ateliers */}
            <motion.div
              variants={fadeUp}
              className="mt-14 flex items-center justify-center gap-8 flex-wrap"
            >
              {['Paris', 'Milan', 'London'].map((city) => (
                <span key={city} className="text-label-luxury text-ivory/40">
                  {city}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
