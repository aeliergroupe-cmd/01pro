import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { HeroSection } from '@/components/home/HeroSection';
import { MarqueeText } from '@/components/home/MarqueeText';
import { EditorialCampaign } from '@/components/home/EditorialCampaign';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { BrandManifesto } from '@/components/home/BrandManifesto';
import { LookbookCarousel } from '@/components/home/LookbookCarousel';
import { CraftsmanshipSection } from '@/components/home/CraftsmanshipSection';
import { ConciergeCTA } from '@/components/home/ConciergeCTA';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata: Metadata = genMeta({
  title: 'Modern European Luxury Tailoring',
  description:
    'ATELIER GROUPE — A modern European luxury tailoring maison. Discover bespoke menswear crafted with uncompromising precision in Naples, Milan, and London.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Navbar isTransparent />
      <main>
        <HeroSection />
        <MarqueeText />
        <EditorialCampaign />
        <FeaturedCollections />
        <BrandManifesto />
        <LookbookCarousel />
        <CraftsmanshipSection />
        <ConciergeCTA />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
