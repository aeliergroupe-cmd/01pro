import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo';
import { ATELIERS } from '@/lib/constants';

export const metadata: Metadata = genMeta({
  title: 'About ATELIER GROUPE',
  description: 'The story of ATELIER GROUPE — a modern European luxury tailoring maison.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative w-full h-[70vh] overflow-hidden mb-20">
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&auto=format&fit=crop&q=85"
          alt="ATELIER GROUPE atelier interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/70" />
        <div className="absolute inset-0 flex items-end gutter-x pb-16 max-w-screen-xl mx-auto">
          <div>
            <span className="text-label-luxury text-accent/80 block mb-3">Founded 2018 · Paris</span>
            <h1 className="font-serif text-display font-light text-background leading-none">
              The <em className="italic">Atelier</em>
            </h1>
          </div>
        </div>
      </div>

      <div className="gutter-x max-w-screen-xl mx-auto">
        {/* Manifesto */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <span className="text-label-luxury text-muted-foreground block mb-5">Our Philosophy</span>
            <div className="space-y-5 text-sm text-muted-foreground leading-relaxed font-light">
              <p>
                ATELIER GROUPE was founded on a single conviction: that the contemporary man deserves
                garments built with the same rigour and attention that his grandfather's tailor brought
                to every commission — combined with the materials, proportions, and understanding of
                modern life that this century demands.
              </p>
              <p>
                We work from ateliers in Paris, Milan, and London — three cities whose relationship
                with tailored clothing is deep, distinct, and often in productive tension. The
                Neapolitan softness, the Milanese precision, the English robustness: we draw from all
                three traditions without being bound by any of them.
              </p>
              <p>
                Every cloth we use is traceable to its mill. Every construction technique is
                documented and discussed with the clients who choose to engage with it. Transparency
                is not a marketing position — it is how we maintain the trust that allows us to charge
                the prices that exceptional work requires.
              </p>
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-surface">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80"
              alt="Atelier craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-border pt-16 mb-20">
          <span className="text-label-luxury text-muted-foreground block mb-10">Our Principles</span>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Traceability',
                body: 'Every fibre has a provenance. We know where every cloth originates, who wove it, and why it meets our standards. This knowledge informs every recommendation we make.',
              },
              {
                number: '02',
                title: 'Construction',
                body: 'We work exclusively with canvassed and half-canvassed construction. Fused interlinings have their place — but not in garments intended to last a decade.',
              },
              {
                number: '03',
                title: 'Service',
                body: 'Every client has access to a dedicated advisor. Your measurements are stored. Your preferences are remembered. This is not CRM — it is old-fashioned attentiveness.',
              },
            ].map((v) => (
              <div key={v.number}>
                <span className="text-label-luxury text-accent block mb-3">{v.number}</span>
                <h3 className="font-serif text-xl font-light mb-4">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ateliers */}
        <div className="border-t border-border pt-16 mb-20">
          <span className="text-label-luxury text-muted-foreground block mb-10">Our Locations</span>
          <div className="grid sm:grid-cols-3 gap-8">
            {ATELIERS.map((atelier) => (
              <div key={atelier.id} className="border border-border p-6">
                <h3 className="font-serif text-lg font-light mb-4">{atelier.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground font-light">
                  <p>{atelier.address}</p>
                  <p>{atelier.phone}</p>
                  <p>{atelier.hours}</p>
                </div>
                <Link
                  href="/appointment"
                  className="block mt-6 text-label-luxury text-foreground hover:text-accent transition-colors"
                >
                  Book an Appointment →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-border pt-16 pb-16 text-center">
          <h2 className="font-serif text-3xl font-light mb-4">
            Begin Your <em className="italic">Journey</em>
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto">
            Schedule a consultation at any of our ateliers and meet the team responsible for your wardrobe.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="inline-flex h-12 px-8 items-center bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300"
            >
              Book an Appointment
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-12 px-8 items-center border border-border text-label-luxury text-foreground hover:border-foreground transition-colors duration-300"
            >
              Explore the Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
