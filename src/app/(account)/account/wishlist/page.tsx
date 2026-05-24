import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { MOCK_PRODUCTS } from '@/lib/vendure/mock-data';
import { Heart, Trash2 } from 'lucide-react';

export const metadata: Metadata = genMeta({
  title: 'My Wishlist',
  description: 'Your saved ATELIER GROUPE pieces.',
  path: '/account/wishlist',
});

const WISHLIST_ITEMS = MOCK_PRODUCTS.slice(0, 4);

export default function WishlistPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-light">Wishlist</h1>
        <span className="text-sm text-muted-foreground">{WISHLIST_ITEMS.length} pieces</span>
      </div>

      {WISHLIST_ITEMS.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <Heart size={32} strokeWidth={0.8} className="mx-auto mb-4 text-muted-foreground" />
          <p className="font-serif text-xl font-light mb-2">Your wishlist is empty</p>
          <p className="text-sm text-muted-foreground mb-6">
            Save pieces you love for later consideration.
          </p>
          <Link
            href="/shop"
            className="inline-flex h-12 px-8 items-center bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300"
          >
            Explore the Collection
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {WISHLIST_ITEMS.map((product) => {
            const price = product.variants[0]?.priceWithTax ?? 0;
            const currency = product.variants[0]?.currencyCode ?? 'EUR';
            return (
              <div key={product.id} className="border border-border">
                <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] bg-surface overflow-hidden">
                  {product.featuredAsset && (
                    <Image
                      src={product.featuredAsset.preview}
                      alt={product.featuredAsset.alt ?? product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  )}
                </Link>
                <div className="p-5 flex items-start justify-between">
                  <div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-serif text-base font-light hover:text-accent transition-colors duration-200 block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{formatPrice(price, currency)}</p>
                  </div>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="px-5 pb-5">
                  <Link
                    href={`/products/${product.slug}`}
                    className="block w-full h-10 border border-border flex items-center justify-center text-label-luxury text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
