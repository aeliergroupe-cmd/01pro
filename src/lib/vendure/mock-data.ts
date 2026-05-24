import type { Product, Collection, SearchResult } from '@/types/product';
import type { Article } from '@/types/content';
import type { Order, Appointment } from '@/types/account';

// ============================================================
// ATELIER GROUPE — Mock Data
// Realistic product, editorial, and account data for development.
// Replace with live Vendure + CMS data by pointing env vars
// to a running Vendure instance.
// ============================================================

const UNSPLASH_BASE = 'https://images.unsplash.com';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'The Côte d\'Azur Suit',
    slug: 'cote-dazur-suit',
    description:
      'A study in effortless Mediterranean elegance. Cut from a featherweight Super 150s wool-silk blend sourced from Loro Piana\'s finest mills, this suit achieves the rare balance of structure and drape. The half-canvas construction breathes with the body, while the subtle chalk stripe catches light with understated sophistication.',
    assets: [
      {
        id: 'a1-1',
        preview: `${UNSPLASH_BASE}/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Côte d\'Azur Suit — Front view',
      },
      {
        id: 'a1-2',
        preview: `${UNSPLASH_BASE}/photo-1594938298603-c8148c4b4a9f?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Côte d\'Azur Suit — Detail',
      },
      {
        id: 'a1-3',
        preview: `${UNSPLASH_BASE}/photo-1617196034183-421b4040ed20?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Côte d\'Azur Suit — Back view',
      },
    ],
    featuredAsset: {
      id: 'a1-1',
      preview: `${UNSPLASH_BASE}/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80`,
      alt: 'The Côte d\'Azur Suit',
    },
    facetValues: [
      { id: 'fv1', name: 'Suits', facet: { name: 'Category', code: 'category' } },
      { id: 'fv5', name: 'Light Grey', facet: { name: 'Colour', code: 'colour' } },
    ],
    variants: [
      {
        id: 'v1-38r', name: '38R', sku: 'AG-CDA-38R', priceWithTax: 295000,
        currencyCode: 'EUR', stockLevel: 'IN_STOCK',
        options: [{ id: 'o1', code: '38R', name: '38R', group: { id: 'g1', name: 'Size', code: 'size' } }],
      },
      {
        id: 'v1-40r', name: '40R', sku: 'AG-CDA-40R', priceWithTax: 295000,
        currencyCode: 'EUR', stockLevel: 'IN_STOCK',
        options: [{ id: 'o2', code: '40R', name: '40R', group: { id: 'g1', name: 'Size', code: 'size' } }],
      },
      {
        id: 'v1-42r', name: '42R', sku: 'AG-CDA-42R', priceWithTax: 295000,
        currencyCode: 'EUR', stockLevel: 'LOW_STOCK',
        options: [{ id: 'o3', code: '42R', name: '42R', group: { id: 'g1', name: 'Size', code: 'size' } }],
      },
      {
        id: 'v1-44r', name: '44R', sku: 'AG-CDA-44R', priceWithTax: 295000,
        currencyCode: 'EUR', stockLevel: 'IN_STOCK',
        options: [{ id: 'o4', code: '44R', name: '44R', group: { id: 'g1', name: 'Size', code: 'size' } }],
      },
      {
        id: 'v1-46r', name: '46R', sku: 'AG-CDA-46R', priceWithTax: 295000,
        currencyCode: 'EUR', stockLevel: 'OUT_OF_STOCK',
        options: [{ id: 'o5', code: '46R', name: '46R', group: { id: 'g1', name: 'Size', code: 'size' } }],
      },
    ],
    customFields: {
      fabricComposition: '85% Super 150s Wool, 15% Mulberry Silk',
      careInstructions: 'Dry clean only. Store on padded hanger.',
      madeIn: 'Crafted in Naples, Italy',
      tailoringTime: '3–4 weeks for made-to-measure',
      fittingType: 'Slim',
      weightGsm: 220,
      liningComposition: '100% Bemberg cupro lining',
    },
    collections: [
      { id: 'c1', name: 'The Atelier Collection', slug: 'atelier-collection' },
      { id: 'c4', name: 'The Foundation', slug: 'the-foundation' },
    ],
  },
  {
    id: 'p2',
    name: 'The Marais Overcoat',
    slug: 'marais-overcoat',
    description:
      'Pure Mongolian cashmere, double-faced and woven to a weight that transforms any silhouette into sculpture. The Marais is a coat of quiet authority — its generous lapels, single-breasted structure, and precisely placed flap pockets speak of a garment built for decades, not seasons.',
    assets: [
      {
        id: 'a2-1',
        preview: `${UNSPLASH_BASE}/photo-1539533018447-63fcce2678e3?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Marais Overcoat — Front view',
      },
      {
        id: 'a2-2',
        preview: `${UNSPLASH_BASE}/photo-1490578474895-399ad4ad1195?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Marais Overcoat — Detail',
      },
    ],
    featuredAsset: {
      id: 'a2-1',
      preview: `${UNSPLASH_BASE}/photo-1539533018447-63fcce2678e3?w=900&auto=format&fit=crop&q=80`,
      alt: 'The Marais Overcoat',
    },
    facetValues: [
      { id: 'fv2', name: 'Outerwear', facet: { name: 'Category', code: 'category' } },
      { id: 'fv6', name: 'Camel', facet: { name: 'Colour', code: 'colour' } },
    ],
    variants: [
      { id: 'v2-s', name: 'S', sku: 'AG-MO-S', priceWithTax: 485000, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o6', code: 'S', name: 'S', group: { id: 'g2', name: 'Size', code: 'size' } }] },
      { id: 'v2-m', name: 'M', sku: 'AG-MO-M', priceWithTax: 485000, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o7', code: 'M', name: 'M', group: { id: 'g2', name: 'Size', code: 'size' } }] },
      { id: 'v2-l', name: 'L', sku: 'AG-MO-L', priceWithTax: 485000, currencyCode: 'EUR', stockLevel: 'LOW_STOCK', options: [{ id: 'o8', code: 'L', name: 'L', group: { id: 'g2', name: 'Size', code: 'size' } }] },
      { id: 'v2-xl', name: 'XL', sku: 'AG-MO-XL', priceWithTax: 485000, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o9', code: 'XL', name: 'XL', group: { id: 'g2', name: 'Size', code: 'size' } }] },
    ],
    customFields: {
      fabricComposition: '100% Double-faced Mongolian Cashmere',
      careInstructions: 'Professional dry clean only. Brush gently after wearing.',
      madeIn: 'Crafted in Biella, Italy',
      tailoringTime: '4–6 weeks for made-to-measure',
      fittingType: 'Regular',
      weightGsm: 680,
      liningComposition: '100% Silk satin lining',
    },
    collections: [
      { id: 'c3', name: 'Maison Hiver', slug: 'maison-hiver' },
      { id: 'c4', name: 'The Foundation', slug: 'the-foundation' },
    ],
  },
  {
    id: 'p3',
    name: 'The Saint-Germain Trousers',
    slug: 'saint-germain-trousers',
    description:
      'Woven from pure Irish linen in a weight that holds a clean line while breathing effortlessly in warmth. The Saint-Germain features a medium rise, gentle taper, and side adjusters — elements that together achieve a silhouette that reads as both relaxed and precise.',
    assets: [
      {
        id: 'a3-1',
        preview: `${UNSPLASH_BASE}/photo-1624378439575-d8705ad7ae80?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Saint-Germain Trousers',
      },
    ],
    featuredAsset: {
      id: 'a3-1',
      preview: `${UNSPLASH_BASE}/photo-1624378439575-d8705ad7ae80?w=900&auto=format&fit=crop&q=80`,
      alt: 'The Saint-Germain Trousers',
    },
    facetValues: [
      { id: 'fv3', name: 'Trousers', facet: { name: 'Category', code: 'category' } },
      { id: 'fv7', name: 'Cream', facet: { name: 'Colour', code: 'colour' } },
    ],
    variants: [
      { id: 'v3-3030', name: '30/30', sku: 'AG-SGT-3030', priceWithTax: 89500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o10', code: '30/30', name: '30/30', group: { id: 'g3', name: 'Size', code: 'size' } }] },
      { id: 'v3-3230', name: '32/30', sku: 'AG-SGT-3230', priceWithTax: 89500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o11', code: '32/30', name: '32/30', group: { id: 'g3', name: 'Size', code: 'size' } }] },
      { id: 'v3-3432', name: '34/32', sku: 'AG-SGT-3432', priceWithTax: 89500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o12', code: '34/32', name: '34/32', group: { id: 'g3', name: 'Size', code: 'size' } }] },
    ],
    customFields: {
      fabricComposition: '100% Irish Linen',
      careInstructions: 'Machine wash 30°C delicate or hand wash. Press with steam.',
      madeIn: 'Crafted in Portugal',
      tailoringTime: '2–3 weeks for made-to-measure',
      fittingType: 'Regular',
      weightGsm: 280,
    },
    collections: [
      { id: 'c2', name: 'Riviera Voyage', slug: 'riviera-voyage' },
    ],
  },
  {
    id: 'p4',
    name: 'The Riviera Blazer',
    slug: 'riviera-blazer',
    description:
      'At the intersection of tailoring and ease, the Riviera Blazer is constructed from an exceptional linen-silk blend that behaves like a second skin. Unlined for maximum lightness, with a soft shoulder and patch pockets that acknowledge the jacket\'s ease-of-living origins.',
    assets: [
      {
        id: 'a4-1',
        preview: `${UNSPLASH_BASE}/photo-1617196034099-87e5db0bca6b?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Riviera Blazer',
      },
      {
        id: 'a4-2',
        preview: `${UNSPLASH_BASE}/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Riviera Blazer — Styled',
      },
    ],
    featuredAsset: {
      id: 'a4-1',
      preview: `${UNSPLASH_BASE}/photo-1617196034099-87e5db0bca6b?w=900&auto=format&fit=crop&q=80`,
      alt: 'The Riviera Blazer',
    },
    facetValues: [
      { id: 'fv4', name: 'Blazers', facet: { name: 'Category', code: 'category' } },
      { id: 'fv8', name: 'Navy', facet: { name: 'Colour', code: 'colour' } },
    ],
    variants: [
      { id: 'v4-38r', name: '38R', sku: 'AG-RB-38R', priceWithTax: 189500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o13', code: '38R', name: '38R', group: { id: 'g1', name: 'Size', code: 'size' } }] },
      { id: 'v4-40r', name: '40R', sku: 'AG-RB-40R', priceWithTax: 189500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o14', code: '40R', name: '40R', group: { id: 'g1', name: 'Size', code: 'size' } }] },
      { id: 'v4-42r', name: '42R', sku: 'AG-RB-42R', priceWithTax: 189500, currencyCode: 'EUR', stockLevel: 'LOW_STOCK', options: [{ id: 'o15', code: '42R', name: '42R', group: { id: 'g1', name: 'Size', code: 'size' } }] },
    ],
    customFields: {
      fabricComposition: '70% Irish Linen, 30% Mulberry Silk',
      careInstructions: 'Dry clean preferred. Lay flat to dry if hand-washed.',
      madeIn: 'Crafted in Naples, Italy',
      tailoringTime: '3–4 weeks for made-to-measure',
      fittingType: 'Slim',
      weightGsm: 260,
    },
    collections: [
      { id: 'c2', name: 'Riviera Voyage', slug: 'riviera-voyage' },
      { id: 'c1', name: 'The Atelier Collection', slug: 'atelier-collection' },
    ],
  },
  {
    id: 'p5',
    name: 'The Milano Cashmere',
    slug: 'milano-cashmere',
    description:
      'Knitted from the finest Grade A cashmere in a classic crewneck silhouette. The Milano achieves the ideal balance between warmth and refinement — substantial enough to anchor a winter wardrobe, light enough to layer beneath tailoring without disrupting the shoulder line.',
    assets: [
      {
        id: 'a5-1',
        preview: `${UNSPLASH_BASE}/photo-1576566588028-4147f3842f27?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Milano Cashmere',
      },
    ],
    featuredAsset: {
      id: 'a5-1',
      preview: `${UNSPLASH_BASE}/photo-1576566588028-4147f3842f27?w=900&auto=format&fit=crop&q=80`,
      alt: 'The Milano Cashmere',
    },
    facetValues: [
      { id: 'fv5k', name: 'Knitwear', facet: { name: 'Category', code: 'category' } },
      { id: 'fv9', name: 'Stone', facet: { name: 'Colour', code: 'colour' } },
    ],
    variants: [
      { id: 'v5-s', name: 'S', sku: 'AG-MCA-S', priceWithTax: 149500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o16', code: 'S', name: 'S', group: { id: 'g2', name: 'Size', code: 'size' } }] },
      { id: 'v5-m', name: 'M', sku: 'AG-MCA-M', priceWithTax: 149500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o17', code: 'M', name: 'M', group: { id: 'g2', name: 'Size', code: 'size' } }] },
      { id: 'v5-l', name: 'L', sku: 'AG-MCA-L', priceWithTax: 149500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o18', code: 'L', name: 'L', group: { id: 'g2', name: 'Size', code: 'size' } }] },
      { id: 'v5-xl', name: 'XL', sku: 'AG-MCA-XL', priceWithTax: 149500, currencyCode: 'EUR', stockLevel: 'OUT_OF_STOCK', options: [{ id: 'o19', code: 'XL', name: 'XL', group: { id: 'g2', name: 'Size', code: 'size' } }] },
    ],
    customFields: {
      fabricComposition: '100% Grade A Mongolian Cashmere, 2-ply',
      careInstructions: 'Hand wash cold or dry clean. Lay flat to dry.',
      madeIn: 'Crafted in Scotland',
      tailoringTime: 'Ready to ship in 2–3 business days',
      fittingType: 'Regular',
      weightGsm: 320,
    },
    collections: [
      { id: 'c3', name: 'Maison Hiver', slug: 'maison-hiver' },
    ],
  },
  {
    id: 'p6',
    name: 'The Portofino Shirt',
    slug: 'portofino-shirt',
    description:
      'Woven from Sea Island cotton — among the rarest and finest cotton fibres in the world — the Portofino achieves a lustre and softness that synthetic fabrics can only approximate. A spread collar and mother-of-pearl buttons complete a shirt built for the most considered occasions.',
    assets: [
      {
        id: 'a6-1',
        preview: `${UNSPLASH_BASE}/photo-1596755094514-f87e34085b2c?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Portofino Shirt',
      },
    ],
    featuredAsset: {
      id: 'a6-1',
      preview: `${UNSPLASH_BASE}/photo-1596755094514-f87e34085b2c?w=900&auto=format&fit=crop&q=80`,
      alt: 'The Portofino Shirt',
    },
    facetValues: [
      { id: 'fv6s', name: 'Shirts', facet: { name: 'Category', code: 'category' } },
      { id: 'fv10', name: 'White', facet: { name: 'Colour', code: 'colour' } },
    ],
    variants: [
      { id: 'v6-15', name: '15"', sku: 'AG-PS-15', priceWithTax: 42500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o20', code: '15', name: '15"', group: { id: 'g4', name: 'Collar', code: 'collar' } }] },
      { id: 'v6-155', name: '15.5"', sku: 'AG-PS-155', priceWithTax: 42500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o21', code: '15.5', name: '15.5"', group: { id: 'g4', name: 'Collar', code: 'collar' } }] },
      { id: 'v6-16', name: '16"', sku: 'AG-PS-16', priceWithTax: 42500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o22', code: '16', name: '16"', group: { id: 'g4', name: 'Collar', code: 'collar' } }] },
      { id: 'v6-165', name: '16.5"', sku: 'AG-PS-165', priceWithTax: 42500, currencyCode: 'EUR', stockLevel: 'LOW_STOCK', options: [{ id: 'o23', code: '16.5', name: '16.5"', group: { id: 'g4', name: 'Collar', code: 'collar' } }] },
    ],
    customFields: {
      fabricComposition: '100% Sea Island Cotton, 170 thread count',
      careInstructions: 'Machine wash 30°C delicate or hand wash. Press with steam.',
      madeIn: 'Crafted in Naples, Italy',
      tailoringTime: 'Ready to ship in 2–3 business days',
      fittingType: 'Slim',
      weightGsm: 90,
    },
    collections: [
      { id: 'c4', name: 'The Foundation', slug: 'the-foundation' },
    ],
  },
  {
    id: 'p7',
    name: 'The Sorrento Suit',
    slug: 'sorrento-suit',
    description:
      'Named for the cliff-top town that inspired a season of contemplation, the Sorrento is built from a medium-weight flannel that belongs equally in a boardroom and a winter garden. The double-breasted silhouette is cut to flatter through the chest while remaining unencumbering through the shoulders.',
    assets: [
      {
        id: 'a7-1',
        preview: `${UNSPLASH_BASE}/photo-1593032465175-481ac7f401a0?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Sorrento Suit',
      },
    ],
    featuredAsset: {
      id: 'a7-1',
      preview: `${UNSPLASH_BASE}/photo-1593032465175-481ac7f401a0?w=900&auto=format&fit=crop&q=80`,
      alt: 'The Sorrento Suit',
    },
    facetValues: [
      { id: 'fv1', name: 'Suits', facet: { name: 'Category', code: 'category' } },
      { id: 'fv11', name: 'Charcoal', facet: { name: 'Colour', code: 'colour' } },
    ],
    variants: [
      { id: 'v7-38r', name: '38R', sku: 'AG-SS-38R', priceWithTax: 345000, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o24', code: '38R', name: '38R', group: { id: 'g1', name: 'Size', code: 'size' } }] },
      { id: 'v7-40r', name: '40R', sku: 'AG-SS-40R', priceWithTax: 345000, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o25', code: '40R', name: '40R', group: { id: 'g1', name: 'Size', code: 'size' } }] },
      { id: 'v7-42r', name: '42R', sku: 'AG-SS-42R', priceWithTax: 345000, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o26', code: '42R', name: '42R', group: { id: 'g1', name: 'Size', code: 'size' } }] },
    ],
    customFields: {
      fabricComposition: '100% Super 130s Flannel, pure new wool',
      careInstructions: 'Dry clean only. Store on padded hanger.',
      madeIn: 'Crafted in Naples, Italy',
      tailoringTime: '3–4 weeks for made-to-measure',
      fittingType: 'Regular',
      weightGsm: 340,
      liningComposition: '100% Bemberg cupro lining',
    },
    collections: [
      { id: 'c3', name: 'Maison Hiver', slug: 'maison-hiver' },
      { id: 'c1', name: 'The Atelier Collection', slug: 'atelier-collection' },
    ],
  },
  {
    id: 'p8',
    name: 'The Biarritz Pullover',
    slug: 'biarritz-pullover',
    description:
      'A turtleneck cut in extra-fine merino wool that serves as the ideal foundation for layering beneath tailoring. The Biarritz sits precisely at the collarbone, its ribbed neck providing warmth without bulk — a quality that becomes apparent the first time it disappears beneath a well-cut blazer lapel.',
    assets: [
      {
        id: 'a8-1',
        preview: `${UNSPLASH_BASE}/photo-1613945932746-36dcb7f9fe82?w=900&auto=format&fit=crop&q=80`,
        alt: 'The Biarritz Pullover',
      },
    ],
    featuredAsset: {
      id: 'a8-1',
      preview: `${UNSPLASH_BASE}/photo-1613945932746-36dcb7f9fe82?w=900&auto=format&fit=crop&q=80`,
      alt: 'The Biarritz Pullover',
    },
    facetValues: [
      { id: 'fv5k', name: 'Knitwear', facet: { name: 'Category', code: 'category' } },
      { id: 'fv12', name: 'Ecru', facet: { name: 'Colour', code: 'colour' } },
    ],
    variants: [
      { id: 'v8-s', name: 'S', sku: 'AG-BP-S', priceWithTax: 89500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o27', code: 'S', name: 'S', group: { id: 'g2', name: 'Size', code: 'size' } }] },
      { id: 'v8-m', name: 'M', sku: 'AG-BP-M', priceWithTax: 89500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o28', code: 'M', name: 'M', group: { id: 'g2', name: 'Size', code: 'size' } }] },
      { id: 'v8-l', name: 'L', sku: 'AG-BP-L', priceWithTax: 89500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o29', code: 'L', name: 'L', group: { id: 'g2', name: 'Size', code: 'size' } }] },
      { id: 'v8-xl', name: 'XL', sku: 'AG-BP-XL', priceWithTax: 89500, currencyCode: 'EUR', stockLevel: 'IN_STOCK', options: [{ id: 'o30', code: 'XL', name: 'XL', group: { id: 'g2', name: 'Size', code: 'size' } }] },
    ],
    customFields: {
      fabricComposition: '100% Extra-fine Merino, 17.5 micron',
      careInstructions: 'Machine wash 30°C delicate, reshape and lay flat to dry.',
      madeIn: 'Crafted in Scotland',
      tailoringTime: 'Ready to ship in 2–3 business days',
      fittingType: 'Regular',
      weightGsm: 290,
    },
    collections: [
      { id: 'c3', name: 'Maison Hiver', slug: 'maison-hiver' },
      { id: 'c4', name: 'The Foundation', slug: 'the-foundation' },
    ],
  },
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    name: 'The Atelier Collection',
    slug: 'atelier-collection',
    description:
      'Our definitive statement — a curated selection of exceptional tailoring that represents the atelier at its most precise. Each piece has been constructed to the highest possible standard, using only cloths and materials that meet our exacting criteria.',
    featuredAsset: {
      id: 'ca1',
      preview: `${UNSPLASH_BASE}/photo-1558769132-cb1aea458c5e?w=1200&auto=format&fit=crop&q=80`,
      alt: 'The Atelier Collection',
    },
  },
  {
    id: 'c2',
    name: 'Riviera Voyage',
    slug: 'riviera-voyage',
    description:
      'A wardrobe conceived for movement — from early morning terraces to candlelit dinners above the Mediterranean. Lightweight fabrics, relaxed silhouettes, and the kind of ease that feels luxurious rather than lazy.',
    featuredAsset: {
      id: 'ca2',
      preview: `${UNSPLASH_BASE}/photo-1506794778202-cad84cf45f1d?w=1200&auto=format&fit=crop&q=80`,
      alt: 'Riviera Voyage Collection',
    },
  },
  {
    id: 'c3',
    name: 'Maison Hiver',
    slug: 'maison-hiver',
    description:
      'Cold weather demands exceptional wool, exceptional cashmere, and exceptional construction. The Maison Hiver collection is built to be worn in northern cities and mountain retreats alike — warmth without compromise.',
    featuredAsset: {
      id: 'ca3',
      preview: `${UNSPLASH_BASE}/photo-1490578474895-399ad4ad1195?w=1200&auto=format&fit=crop&q=80`,
      alt: 'Maison Hiver Collection',
    },
  },
  {
    id: 'c4',
    name: 'The Foundation',
    slug: 'the-foundation',
    description:
      'The essential wardrobe — pieces that serve as the bedrock of a considered personal style. Selected for their versatility, their longevity, and their ability to anchor almost any combination.',
    featuredAsset: {
      id: 'ca4',
      preview: `${UNSPLASH_BASE}/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&q=80`,
      alt: 'The Foundation Collection',
    },
  },
];

export const MOCK_SEARCH_RESULT: SearchResult = {
  totalItems: MOCK_PRODUCTS.length,
  items: MOCK_PRODUCTS.map((p) => ({
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
  })),
  facetValues: [
    { count: 2, facetValue: { id: 'fv1', name: 'Suits', facet: { id: 'f1', name: 'Category', code: 'category' } } },
    { count: 1, facetValue: { id: 'fv2', name: 'Outerwear', facet: { id: 'f1', name: 'Category', code: 'category' } } },
    { count: 1, facetValue: { id: 'fv3', name: 'Trousers', facet: { id: 'f1', name: 'Category', code: 'category' } } },
    { count: 1, facetValue: { id: 'fv4', name: 'Blazers', facet: { id: 'f1', name: 'Category', code: 'category' } } },
    { count: 2, facetValue: { id: 'fv5k', name: 'Knitwear', facet: { id: 'f1', name: 'Category', code: 'category' } } },
    { count: 1, facetValue: { id: 'fv6s', name: 'Shirts', facet: { id: 'f1', name: 'Category', code: 'category' } } },
  ],
};

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art1',
    slug: 'art-of-the-perfect-suit',
    title: 'The Art of the Perfect Suit',
    subtitle: 'On construction, cloth, and the pursuit of something that lasts',
    excerpt:
      'A suit is a conversation between tailor and wearer that unfolds over years. Understanding that conversation begins with cloth.',
    body: `
      The question of what makes a suit perfect is one that tailors have debated for centuries, and the answer, frustratingly, resists simplicity. A perfect suit is not merely a matter of cut — though cut is decisive. It is not merely a matter of cloth — though cloth determines character. It is the convergence of construction, material, and the body it is built to serve.

      We begin with canvas. A fully canvassed suit jacket contains a layer of horsehair and other natural fibres between the outer fabric and the lining. Over time, through wearing and dry cleaning, this canvas moulds to the shape of the wearer\'s chest. A fused suit — where the interfacing is glued — cannot do this. It will always retain the shape of the block it was pressed on, never the shape of you.

      Then there is cloth. We work primarily with mills in the Biella region of Piedmont and with Loro Piana, whose Super 150s and Super 180s wools represent the apex of what can be achieved with a natural fibre. The thread count — that Super 150s designation — refers to the fineness of the wool fibre, measured in the number of threads that can be spun from a single kilogram of wool.
    `,
    coverImage: `${UNSPLASH_BASE}/photo-1558769132-cb1aea458c5e?w=1400&auto=format&fit=crop&q=85`,
    coverImageAlt: 'A tailored suit draped over a chair',
    category: 'tailoring',
    author: { name: 'Édouard Fontaine', role: 'Creative Director' },
    publishedAt: '2025-04-15',
    readingTime: 8,
    featured: true,
    tags: ['tailoring', 'suits', 'craft', 'fabric'],
  },
  {
    id: 'art2',
    slug: 'cashmere-from-inner-mongolia',
    title: 'Fabric Stories: Cashmere',
    subtitle: 'Tracing our finest fibre from plateau to finished cloth',
    excerpt:
      'Each spring, the cashmere goats of Inner Mongolia are combed — not sheared — to collect fibres so fine they are measured in microns.',
    body: `
      The Alashan Plateau sits at 1,500 metres above sea level in Inner Mongolia. Winters are extreme, dropping to −40°C, and it is precisely this severity that produces something remarkable: the undercoat of the cashmere goat.

      During winter, the goat grows a dense protective undercoat that insulates against the cold. In spring, as temperatures rise, the animal naturally begins to shed this undercoat. For millennia, nomadic herders have collected this fibre through combing — a practice that harms neither animal nor fibre. A single goat yields approximately 150 grams of raw cashmere per year. Our Marais Overcoat requires the annual yield of four goats.

      The raw fibre is sorted by hand, separating the fine undercoat from the coarser guard hairs. The finest grades — those measuring 14 to 15.5 microns in diameter — are reserved for the most exceptional cloths. By comparison, human hair measures approximately 70 microns. The softness of cashmere is not an impression; it is physics.
    `,
    coverImage: `${UNSPLASH_BASE}/photo-1490578474895-399ad4ad1195?w=1400&auto=format&fit=crop&q=85`,
    coverImageAlt: 'Cashmere overcoat detail',
    category: 'craft',
    author: { name: 'Marie-Claire Dubois', role: 'Head of Fabric Sourcing' },
    publishedAt: '2025-03-22',
    readingTime: 6,
    featured: true,
    tags: ['cashmere', 'fabric', 'craft', 'sourcing'],
  },
  {
    id: 'art3',
    slug: 'inside-the-atelier',
    title: 'Inside the Atelier',
    subtitle: 'How a coat takes shape over six weeks',
    excerpt:
      'The making of a coat at ATELIER GROUPE involves forty-two distinct steps and the hands of seven craftspeople. We document each one.',
    body: `
      Step one is the consultation — a conversation that can last two hours, during which we discuss everything from the client\'s existing wardrobe to the specific occasions the coat must serve. Is this a coat for the city or the country? For warmth or appearance? For formal occasions or the school run? The answers determine everything that follows.

      Step two is the taking of measurements. We record twenty-three separate measurements, some of which — the distance from the seventh cervical vertebra to the natural waist, for instance — are not taken by most tailors. This precision is what allows us to achieve a shoulder that sits exactly right.

      Step three is cloth selection. We maintain a library of over eight hundred cloths, sourced from the world\'s finest mills. For an overcoat, we will typically show the client twelve to fifteen cloths, chosen based on the outcomes of the consultation.
    `,
    coverImage: `${UNSPLASH_BASE}/photo-1581338834647-b0fb40704e21?w=1400&auto=format&fit=crop&q=85`,
    coverImageAlt: 'A tailor at work in the atelier',
    category: 'atelier',
    author: { name: 'Thomas Archambault', role: 'Master Tailor' },
    publishedAt: '2025-02-10',
    readingTime: 10,
    featured: false,
    tags: ['tailoring', 'bespoke', 'craft', 'atelier'],
  },
  {
    id: 'art4',
    slug: 'a-story-of-light-and-tailoring',
    title: 'A Story of Light',
    subtitle: 'The Spring/Summer Campaign',
    excerpt:
      'Shot over three days in the hills above Portofino, our new campaign explores the relationship between architecture, landscape, and the perfectly considered garment.',
    body: `
      The brief was deceptively simple: find a landscape that does not compete with the clothes, but completes them. We spent three months scouting locations before finding ourselves on a terrace above Portofino, at the golden hour, watching the way the light moved through linen.

      Photographer Élise Moreau, known for her work with the great European fashion houses, brought her characteristic restraint to the project. Each frame was composed with the precision of a still life — the model, the light, the architecture, and the cloth in a precise and unrepeatable relationship.

      The garments — the Riviera Blazer, the Saint-Germain Trousers, the Portofino Shirt — were selected because they belong in this landscape. Not as costume, but as companions to a certain kind of life.
    `,
    coverImage: `${UNSPLASH_BASE}/photo-1506794778202-cad84cf45f1d?w=1400&auto=format&fit=crop&q=85`,
    coverImageAlt: 'Campaign editorial shot',
    category: 'campaign',
    author: { name: 'Édouard Fontaine', role: 'Creative Director' },
    publishedAt: '2025-05-01',
    readingTime: 5,
    featured: true,
    tags: ['campaign', 'editorial', 'summer', 'photography'],
  },
  {
    id: 'art5',
    slug: 'five-pieces-for-life',
    title: 'Five Pieces for Life',
    subtitle: 'The considered wardrobe, reduced to its essentials',
    excerpt:
      'If you could keep only five garments, what would they be? We have been thinking about this question for a long time.',
    body: `
      The exercise is not academic. Understanding which five pieces would genuinely suffice — and why — illuminates what a wardrobe is for, what makes a garment worth owning, and what distinguishes a piece of lasting value from a seasonal distraction.

      Our answer: one exceptional suit, one great overcoat, one fine knitwear piece, one perfect shirt, one pair of well-cut trousers. What changes, of course, is what "exceptional" and "perfect" mean in each category. The answer to that question is the entire project of this house.

      The suit must be versatile without being generic. It must work for the office, for a wedding, for an evening. This requires a neutral cloth — a mid-grey or a navy — and a silhouette that reads as contemporary without being fashion-forward.
    `,
    coverImage: `${UNSPLASH_BASE}/photo-1617196034183-421b4040ed20?w=1400&auto=format&fit=crop&q=85`,
    coverImageAlt: 'A considered wardrobe arrangement',
    category: 'style',
    author: { name: 'Édouard Fontaine', role: 'Creative Director' },
    publishedAt: '2025-01-18',
    readingTime: 7,
    featured: false,
    tags: ['style', 'wardrobe', 'essentials'],
  },
  {
    id: 'art6',
    slug: 'philosophy-of-restraint',
    title: 'The Philosophy of Restraint',
    subtitle: 'In conversation with Édouard Fontaine',
    excerpt:
      'Our Creative Director on why less is not merely more, but the only honest position available to a luxury house in the current era.',
    body: `
      There is a provocation embedded in restraint. To offer less — to refuse the logo, the seasonal trend, the synthetic performance fabric — is to make a claim about what matters. And claims of this kind attract scrutiny.

      What we are saying, when we make a coat from double-faced cashmere and charge accordingly, is that the relationship between price and quality can be honoured — that there are things worth making well, materials worth sourcing carefully, craftspeople worth paying fairly. This is not a modest claim in a world where fast fashion has trained consumers to expect low prices as their right.

      The restraint is not minimalism for its own sake. It is the result of editing — of refusing to add details that do not earn their place, fabrics that do not justify their cost, silhouettes that will not endure. The suit that looks correct in 2025 should look correct in 2040.
    `,
    coverImage: `${UNSPLASH_BASE}/photo-1507003211169-0a1dd7228f2d?w=1400&auto=format&fit=crop&q=85`,
    coverImageAlt: 'Creative Director portrait',
    category: 'atelier',
    author: { name: 'Édouard Fontaine', role: 'Creative Director' },
    publishedAt: '2024-12-05',
    readingTime: 9,
    featured: false,
    tags: ['philosophy', 'design', 'luxury', 'craft'],
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord1',
    code: 'AG-2025-00142',
    state: 'Delivered',
    totalWithTax: 295000,
    currencyCode: 'EUR',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-03-20T14:00:00Z',
    lines: [
      {
        id: 'ol1',
        quantity: 1,
        unitPriceWithTax: 295000,
        linePriceWithTax: 295000,
        productVariant: {
          id: 'v1-40r',
          name: '40R',
          sku: 'AG-CDA-40R',
          product: {
            id: 'p1',
            name: 'The Côte d\'Azur Suit',
            slug: 'cote-dazur-suit',
            featuredAsset: { preview: `${UNSPLASH_BASE}/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80` },
          },
        },
      },
    ],
    shippingAddress: {
      fullName: 'James Whitmore',
      streetLine1: '14 Mount Street',
      city: 'London',
      postalCode: 'W1K 2RN',
      country: 'United Kingdom',
    },
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt1',
    type: 'fitting',
    status: 'confirmed',
    atelier: 'London Studio',
    date: '2025-06-10',
    time: '14:00',
    advisorName: 'Oliver Pemberton',
    notes: 'First fitting for The Côte d\'Azur Suit. Client prefers slim silhouette.',
    createdAt: '2025-05-20T09:00:00Z',
  },
];
