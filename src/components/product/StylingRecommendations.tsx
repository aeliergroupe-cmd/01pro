import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { MOCK_PRODUCTS } from '@/lib/vendure/mock-data';
import type { Product } from '@/types/product';

interface StylingRecommendationsProps {
  currentProduct: Product;
}

export function StylingRecommendations({ currentProduct }: StylingRecommendationsProps) {
  const related = MOCK_PRODUCTS
    .filter((p) => p.id !== currentProduct.id)
    .filter((p) =>
      p.facetValues.some((fv) =>
        currentProduct.facetValues.some((cf) => cf.id === fv.id)
      ) ||
      p.collections.some((c) =>
        currentProduct.collections.some((cc) => cc.id === c.id)
      )
    )
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="border-t border-border pt-12">
      <div className="mb-8">
        <span className="text-label-luxury text-muted-foreground block mb-2">You May Also Appreciate</span>
        <h2 className="font-serif text-2xl font-light">Complete the Look</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {related.map((product) => {
          const price = product.variants[0]?.priceWithTax ?? 0;
          const currency = product.variants[0]?.currencyCode ?? 'EUR';
          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] bg-surface overflow-hidden mb-4">
                {product.featuredAsset && (
                  <Image
                    src={product.featuredAsset.preview}
                    alt={product.featuredAsset.alt ?? product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                )}
              </div>
              <div>
                <p className="font-serif text-base font-light text-foreground group-hover:text-accent transition-colors duration-200 leading-snug">
                  {product.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatPrice(price, currency)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
