import type { Metadata } from 'next';
import { Suspense } from 'react';
import { generateMetadata as genMeta } from '@/lib/seo';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { SortSelect } from '@/components/shop/SortSelect';
import { MOCK_SEARCH_RESULT } from '@/lib/vendure/mock-data';

export const metadata: Metadata = genMeta({
  title: 'Shop',
  description: 'Explore the complete ATELIER GROUPE collection — exceptional suits, outerwear, knitwear, and tailoring essentials.',
  path: '/shop',
});

interface ShopPageProps {
  searchParams: Promise<{ facet?: string | string[]; sort?: string; page?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const selectedFacetIds = Array.isArray(params.facet)
    ? params.facet
    : params.facet
    ? [params.facet]
    : [];

  // Filter mock data by selected facets
  const filteredProducts =
    selectedFacetIds.length > 0
      ? MOCK_SEARCH_RESULT.items.filter((p) =>
          selectedFacetIds.some((id) => p.facetValueIds.includes(id))
        )
      : MOCK_SEARCH_RESULT.items;

  // Build facet groups from mock data
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
      {/* Page header */}
      <div className="mb-12 pb-8 border-b border-border">
        <span className="text-label-luxury text-muted-foreground block mb-3">The Collection</span>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-serif text-headline font-light">
            All <em className="italic">Pieces</em>
          </h1>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-12">
        {/* Sidebar filters */}
        <Suspense>
          <CategoryFilter facetGroups={facetGroups} selectedFacetIds={selectedFacetIds} />
        </Suspense>

        {/* Main content */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground hidden lg:block">
              {filteredProducts.length} results
            </p>
            <Suspense>
              <SortSelect />
            </Suspense>
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
