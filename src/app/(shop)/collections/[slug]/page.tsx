import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { MOCK_COLLECTIONS, MOCK_PRODUCTS } from '@/lib/vendure/mock-data';
import { CollectionHeader } from '@/components/shop/CollectionHeader';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { SortSelect } from '@/components/shop/SortSelect';
import { MOCK_SEARCH_RESULT } from '@/lib/vendure/mock-data';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ facet?: string | string[]; sort?: string }>;
}

export async function generateStaticParams() {
  return MOCK_COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = MOCK_COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return {};
  return genMeta({
    title: collection.name,
    description: collection.description ?? `Discover the ${collection.name} collection.`,
    path: `/collections/${slug}`,
    image: collection.featuredAsset?.preview,
  });
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  const collection = MOCK_COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();

  const selectedFacetIds = Array.isArray(sp.facet)
    ? sp.facet
    : sp.facet
    ? [sp.facet]
    : [];

  // Products in this collection
  const collectionProducts = MOCK_PRODUCTS.filter((p) =>
    p.collections.some((c) => c.slug === slug)
  );

  const filteredProducts =
    selectedFacetIds.length > 0
      ? collectionProducts.filter((p) =>
          selectedFacetIds.some((id) => p.facetValues.some((fv) => fv.id === id))
        )
      : collectionProducts;

  // Convert full Product to ProductSearchResult shape for ProductGrid
  const searchResults = filteredProducts.map((p) => ({
    productId: p.id,
    productVariantId: p.variants[0]?.id ?? '',
    productName: p.name,
    slug: p.slug,
    description: p.description,
    priceWithTax: { value: p.variants[0]?.priceWithTax ?? 0 },
    currencyCode: p.variants[0]?.currencyCode ?? 'EUR',
    productAsset: p.featuredAsset ?? null,
    facetValueIds: p.facetValues.map((fv) => fv.id),
    collectionIds: p.collections.map((c) => c.id),
  }));

  const facetGroups = [
    {
      name: 'Category',
      code: 'category',
      values: MOCK_SEARCH_RESULT.facetValues
        .filter((fv) => fv.facetValue.facet.code === 'category')
        .map((fv) => ({
          id: fv.facetValue.id,
          name: fv.facetValue.name,
          count: fv.count,
        })),
    },
  ];

  return (
    <div className="gutter-x py-12 max-w-screen-xl mx-auto">
      <CollectionHeader collection={collection} productCount={filteredProducts.length} />

      <div className="grid lg:grid-cols-[220px_1fr] gap-12">
        <Suspense>
          <CategoryFilter facetGroups={facetGroups} selectedFacetIds={selectedFacetIds} />
        </Suspense>

        <div>
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground hidden lg:block">
              {filteredProducts.length} results
            </p>
            <Suspense>
              <SortSelect />
            </Suspense>
          </div>
          <ProductGrid products={searchResults} />
        </div>
      </div>
    </div>
  );
}
