export interface ProductAsset {
  id: string;
  preview: string;
  source?: string;
  focalPoint?: { x: number; y: number } | null;
  alt?: string;
}

export interface ProductOption {
  id: string;
  code: string;
  name: string;
  group: {
    id: string;
    name: string;
    code: string;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  priceWithTax: number;
  currencyCode: string;
  stockLevel: 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK';
  featuredAsset?: ProductAsset | null;
  options: ProductOption[];
}

export interface ProductCustomFields {
  fabricComposition?: string;
  careInstructions?: string;
  madeIn?: string;
  tailoringTime?: string;
  fittingType?: string;
  weightGsm?: number;
  liningComposition?: string;
  constructionNotes?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  assets: ProductAsset[];
  featuredAsset?: ProductAsset | null;
  facetValues: Array<{
    id: string;
    name: string;
    facet: { name: string; code: string };
  }>;
  variants: ProductVariant[];
  customFields: ProductCustomFields;
  collections: Array<{ id: string; name: string; slug: string }>;
}

export interface ProductSearchResult {
  productId: string;
  productVariantId: string;
  productName: string;
  slug: string;
  description: string;
  priceWithTax: SinglePrice | PriceRange;
  currencyCode: string;
  productAsset?: ProductAsset | null;
  facetValueIds: string[];
  collectionIds: string[];
}

export interface SinglePrice {
  value: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface SearchFacetValue {
  count: number;
  facetValue: {
    id: string;
    name: string;
    facet: { id: string; name: string; code: string };
  };
}

export interface SearchResult {
  totalItems: number;
  items: ProductSearchResult[];
  facetValues: SearchFacetValue[];
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredAsset?: ProductAsset | null;
  children?: Collection[];
  parent?: { id: string; name: string; slug: string } | null;
}

export type SortOrder = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest';

export interface CartLine {
  id: string;
  quantity: number;
  unitPriceWithTax: number;
  linePriceWithTax: number;
  productVariant: {
    id: string;
    name: string;
    sku: string;
    product: {
      id: string;
      name: string;
      slug: string;
      featuredAsset?: ProductAsset | null;
    };
    options: ProductOption[];
  };
}

export interface Cart {
  id: string;
  code: string;
  state: string;
  totalQuantity: number;
  subTotalWithTax: number;
  totalWithTax: number;
  shippingWithTax: number;
  lines: CartLine[];
  shippingLines: Array<{
    shippingMethod: { id: string; name: string; description: string };
    priceWithTax: number;
  }>;
}
