import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { MOCK_PRODUCTS } from '@/lib/vendure/mock-data';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { FabricComposition } from '@/components/product/FabricComposition';
import { TailoringDetails } from '@/components/product/TailoringDetails';
import { StylingRecommendations } from '@/components/product/StylingRecommendations';
import { ProductEditorialStory } from '@/components/product/ProductEditorialStory';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return genMeta({
    title: product.name,
    description: product.description.slice(0, 155),
    path: `/products/${slug}`,
    image: product.featuredAsset?.preview,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <div className="gutter-x py-8 lg:py-12 max-w-screen-xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
        <a href="/shop" className="hover:text-foreground transition-colors">Shop</a>
        <span>/</span>
        {product.collections[0] && (
          <>
            <a
              href={`/collections/${product.collections[0].slug}`}
              className="hover:text-foreground transition-colors"
            >
              {product.collections[0].name}
            </a>
            <span>/</span>
          </>
        )}
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Main product layout */}
      <div className="grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px] gap-12 lg:gap-16 mb-20">
        {/* Gallery */}
        <Suspense fallback={<div className="aspect-[3/4] bg-surface animate-pulse" />}>
          <ProductGallery assets={product.assets} productName={product.name} />
        </Suspense>

        {/* Product info — sticky on desktop */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductInfo product={product} />

          {/* Fabric + Tailoring accordions */}
          <div className="mt-8">
            <FabricComposition customFields={product.customFields} />
            <TailoringDetails customFields={product.customFields} />
          </div>
        </div>
      </div>

      {/* Editorial story section */}
      <ProductEditorialStory product={product} />

      {/* Related products */}
      <div className="mt-16">
        <StylingRecommendations currentProduct={product} />
      </div>
    </div>
  );
}
