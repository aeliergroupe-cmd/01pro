'use client';

import { useState } from 'react';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { SizeSelector } from './SizeSelector';
import { AddToCartButton } from './AddToCartButton';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product.variants[0]?.id ?? null
  );

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];
  const price = selectedVariant?.priceWithTax ?? 0;
  const currency = selectedVariant?.currencyCode ?? 'EUR';
  const category = product.facetValues.find((fv) => fv.facet.code === 'category');

  return (
    <div className="flex flex-col gap-6">
      {/* Category + Name */}
      <div>
        {category && (
          <span className="text-label-luxury text-muted-foreground block mb-2">
            {category.name}
          </span>
        )}
        <h1 className="font-serif text-4xl lg:text-5xl font-light leading-tight">
          {product.name}
        </h1>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-2xl font-light text-accent">
          {formatPrice(price, currency)}
        </span>
        <span className="text-xs text-muted-foreground">incl. VAT</span>
      </div>

      {/* Origin badge */}
      {product.customFields?.madeIn && (
        <p className="text-label-luxury text-muted-foreground border-l-2 border-accent pl-3">
          {product.customFields.madeIn}
        </p>
      )}

      <div className="border-t border-border" />

      {/* Size Selector */}
      <SizeSelector
        variants={product.variants}
        selectedVariantId={selectedVariantId}
        onSelect={setSelectedVariantId}
      />

      {/* Add to Cart */}
      <AddToCartButton
        productName={product.name}
        variantId={selectedVariantId}
        imageUrl={product.featuredAsset?.preview}
        price={price}
      />

      {/* Description */}
      <div className="border-t border-border pt-6">
        <p className="text-sm text-muted-foreground leading-relaxed font-light">
          {product.description}
        </p>
      </div>

      {/* Quick specs */}
      <div className="border-t border-border pt-6 grid grid-cols-2 gap-4">
        {product.customFields?.tailoringTime && (
          <div>
            <span className="text-label-luxury text-muted-foreground block mb-1">Delivery</span>
            <span className="text-sm text-foreground font-light">
              {product.customFields.tailoringTime}
            </span>
          </div>
        )}
        {product.customFields?.fittingType && (
          <div>
            <span className="text-label-luxury text-muted-foreground block mb-1">Fit</span>
            <span className="text-sm text-foreground font-light">
              {product.customFields.fittingType}
            </span>
          </div>
        )}
        {product.customFields?.weightGsm && (
          <div>
            <span className="text-label-luxury text-muted-foreground block mb-1">Weight</span>
            <span className="text-sm text-foreground font-light">
              {product.customFields.weightGsm} gsm
            </span>
          </div>
        )}
        {product.collections[0] && (
          <div>
            <span className="text-label-luxury text-muted-foreground block mb-1">Collection</span>
            <span className="text-sm text-foreground font-light">
              {product.collections[0].name}
            </span>
          </div>
        )}
      </div>

      {/* Complimentary services */}
      <div className="border-t border-border pt-6">
        <ul className="space-y-2">
          {[
            'Complimentary alterations included',
            'Free returns within 30 days',
            'Personal styling consultation available',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-1 h-1 rounded-full bg-accent flex-none" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
