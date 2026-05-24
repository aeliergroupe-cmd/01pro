/**
 * ATELIER GROUPE — Vendure Seed Script
 *
 * Populates the Vendure database with:
 *   - A default Channel
 *   - Shipping methods
 *   - Payment method (dummy for dev)
 *   - Facets (Category, Colour, Fitting)
 *   - Collections
 *   - Products with variants and custom fields
 *
 * Run: npm run populate
 */
import {
  bootstrapWorker,
  ChannelService,
  RequestContextService,
  LanguageCode,
  CollectionService,
  FacetService,
  FacetValueService,
  ProductService,
  ProductVariantService,
  ShippingMethodService,
  PaymentMethodService,
} from '@vendure/core';
import { config } from '../vendure-config';

async function populate() {
  const { app } = await bootstrapWorker(config, { skipDbConnectionCheck: false });

  const ctx = await app.get(RequestContextService).create({
    apiType: 'admin',
  });

  console.log('[Seed] Creating facets...');
  const facetService = app.get(FacetService);
  const facetValueService = app.get(FacetValueService);

  const categoryFacet = await facetService.create(ctx, {
    code: 'category',
    translations: [{ languageCode: LanguageCode.en, name: 'Category' }],
    isPrivate: false,
  });

  const categories = ['Suits', 'Outerwear', 'Trousers', 'Blazers', 'Knitwear', 'Shirts'];
  const categoryValues: Record<string, any> = {};
  for (const name of categories) {
    const fv = await facetValueService.create(ctx, categoryFacet, {
      code: name.toLowerCase().replace(/[^a-z]+/g, '-'),
      translations: [{ languageCode: LanguageCode.en, name }],
    });
    categoryValues[name] = fv;
  }

  const colourFacet = await facetService.create(ctx, {
    code: 'colour',
    translations: [{ languageCode: LanguageCode.en, name: 'Colour' }],
    isPrivate: false,
  });

  const colours = ['Light Grey', 'Camel', 'Cream', 'Navy', 'Stone', 'White', 'Charcoal', 'Ecru'];
  const colourValues: Record<string, any> = {};
  for (const name of colours) {
    const fv = await facetValueService.create(ctx, colourFacet, {
      code: name.toLowerCase().replace(/[^a-z]+/g, '-'),
      translations: [{ languageCode: LanguageCode.en, name }],
    });
    colourValues[name] = fv;
  }

  console.log('[Seed] Creating collections...');
  const collectionService = app.get(CollectionService);

  const collections = [
    { name: 'The Atelier Collection', slug: 'atelier-collection', description: 'Our definitive statement of exceptional tailoring.' },
    { name: 'Riviera Voyage', slug: 'riviera-voyage', description: 'A wardrobe conceived for movement across the Mediterranean.' },
    { name: 'Maison Hiver', slug: 'maison-hiver', description: 'Exceptional wool and cashmere for cold weather.' },
    { name: 'The Foundation', slug: 'the-foundation', description: 'The essential wardrobe — pieces that anchor a considered style.' },
  ];

  const createdCollections: Record<string, any> = {};
  for (const col of collections) {
    const created = await collectionService.create(ctx, {
      translations: [
        { languageCode: LanguageCode.en, name: col.name, description: col.description, slug: col.slug },
      ],
      isPrivate: false,
    });
    createdCollections[col.slug] = created;
  }

  console.log('[Seed] Creating products...');
  const productService = app.get(ProductService);
  const productVariantService = app.get(ProductVariantService);

  const products = [
    {
      name: "The Côte d'Azur Suit",
      slug: 'cote-dazur-suit',
      description: "A study in effortless Mediterranean elegance. Cut from a featherweight Super 150s wool-silk blend sourced from Loro Piana's finest mills.",
      facetValueIds: [categoryValues['Suits'].id, colourValues['Light Grey'].id],
      collections: ['atelier-collection', 'the-foundation'],
      customFields: {
        fabricComposition: '85% Super 150s Wool, 15% Mulberry Silk',
        careInstructions: 'Dry clean only. Store on padded hanger.',
        madeIn: 'Crafted in Naples, Italy',
        tailoringTime: '3–4 weeks for made-to-measure',
        fittingType: 'slim',
        weightGsm: 220,
        liningComposition: '100% Bemberg cupro lining',
      },
      variants: [
        { name: '38R', sku: 'AG-CDA-38R', price: 295000 },
        { name: '40R', sku: 'AG-CDA-40R', price: 295000 },
        { name: '42R', sku: 'AG-CDA-42R', price: 295000 },
        { name: '44R', sku: 'AG-CDA-44R', price: 295000 },
        { name: '46R', sku: 'AG-CDA-46R', price: 295000 },
      ],
    },
    {
      name: 'The Marais Overcoat',
      slug: 'marais-overcoat',
      description: 'Pure Mongolian cashmere, double-faced and woven to a weight that transforms any silhouette into sculpture.',
      facetValueIds: [categoryValues['Outerwear'].id, colourValues['Camel'].id],
      collections: ['maison-hiver', 'the-foundation'],
      customFields: {
        fabricComposition: '100% Double-faced Mongolian Cashmere',
        careInstructions: 'Professional dry clean only.',
        madeIn: 'Crafted in Biella, Italy',
        tailoringTime: '4–6 weeks for made-to-measure',
        fittingType: 'regular',
        weightGsm: 680,
        liningComposition: '100% Silk satin lining',
      },
      variants: [
        { name: 'S', sku: 'AG-MO-S', price: 485000 },
        { name: 'M', sku: 'AG-MO-M', price: 485000 },
        { name: 'L', sku: 'AG-MO-L', price: 485000 },
        { name: 'XL', sku: 'AG-MO-XL', price: 485000 },
      ],
    },
    {
      name: 'The Saint-Germain Trousers',
      slug: 'saint-germain-trousers',
      description: 'Woven from pure Irish linen in a weight that holds a clean line while breathing effortlessly.',
      facetValueIds: [categoryValues['Trousers'].id, colourValues['Cream'].id],
      collections: ['riviera-voyage'],
      customFields: {
        fabricComposition: '100% Irish Linen',
        careInstructions: 'Machine wash 30°C delicate.',
        madeIn: 'Crafted in Portugal',
        tailoringTime: '2–3 weeks for made-to-measure',
        fittingType: 'regular',
        weightGsm: 280,
      },
      variants: [
        { name: '30/30', sku: 'AG-SGT-3030', price: 89500 },
        { name: '32/30', sku: 'AG-SGT-3230', price: 89500 },
        { name: '34/32', sku: 'AG-SGT-3432', price: 89500 },
      ],
    },
    {
      name: 'The Riviera Blazer',
      slug: 'riviera-blazer',
      description: 'At the intersection of tailoring and ease — constructed from an exceptional linen-silk blend.',
      facetValueIds: [categoryValues['Blazers'].id, colourValues['Navy'].id],
      collections: ['riviera-voyage', 'atelier-collection'],
      customFields: {
        fabricComposition: '70% Irish Linen, 30% Mulberry Silk',
        careInstructions: 'Dry clean preferred.',
        madeIn: 'Crafted in Naples, Italy',
        tailoringTime: '3–4 weeks for made-to-measure',
        fittingType: 'slim',
        weightGsm: 260,
      },
      variants: [
        { name: '38R', sku: 'AG-RB-38R', price: 189500 },
        { name: '40R', sku: 'AG-RB-40R', price: 189500 },
        { name: '42R', sku: 'AG-RB-42R', price: 189500 },
      ],
    },
    {
      name: 'The Milano Cashmere',
      slug: 'milano-cashmere',
      description: 'Knitted from the finest Grade A cashmere in a classic crewneck silhouette.',
      facetValueIds: [categoryValues['Knitwear'].id, colourValues['Stone'].id],
      collections: ['maison-hiver'],
      customFields: {
        fabricComposition: '100% Grade A Mongolian Cashmere, 2-ply',
        careInstructions: 'Hand wash cold or dry clean.',
        madeIn: 'Crafted in Scotland',
        tailoringTime: 'Ready to ship in 2–3 business days',
        fittingType: 'regular',
        weightGsm: 320,
      },
      variants: [
        { name: 'S', sku: 'AG-MCA-S', price: 149500 },
        { name: 'M', sku: 'AG-MCA-M', price: 149500 },
        { name: 'L', sku: 'AG-MCA-L', price: 149500 },
        { name: 'XL', sku: 'AG-MCA-XL', price: 149500 },
      ],
    },
    {
      name: 'The Portofino Shirt',
      slug: 'portofino-shirt',
      description: 'Woven from Sea Island cotton — among the rarest and finest cotton fibres in the world.',
      facetValueIds: [categoryValues['Shirts'].id, colourValues['White'].id],
      collections: ['the-foundation'],
      customFields: {
        fabricComposition: '100% Sea Island Cotton, 170 thread count',
        careInstructions: 'Machine wash 30°C delicate.',
        madeIn: 'Crafted in Naples, Italy',
        tailoringTime: 'Ready to ship in 2–3 business days',
        fittingType: 'slim',
        weightGsm: 90,
      },
      variants: [
        { name: '15"', sku: 'AG-PS-15', price: 42500 },
        { name: '15.5"', sku: 'AG-PS-155', price: 42500 },
        { name: '16"', sku: 'AG-PS-16', price: 42500 },
        { name: '16.5"', sku: 'AG-PS-165', price: 42500 },
      ],
    },
    {
      name: 'The Sorrento Suit',
      slug: 'sorrento-suit',
      description: 'Built from medium-weight flannel that belongs equally in a boardroom and a winter garden.',
      facetValueIds: [categoryValues['Suits'].id, colourValues['Charcoal'].id],
      collections: ['maison-hiver', 'atelier-collection'],
      customFields: {
        fabricComposition: '100% Super 130s Flannel, pure new wool',
        careInstructions: 'Dry clean only.',
        madeIn: 'Crafted in Naples, Italy',
        tailoringTime: '3–4 weeks for made-to-measure',
        fittingType: 'regular',
        weightGsm: 340,
        liningComposition: '100% Bemberg cupro lining',
      },
      variants: [
        { name: '38R', sku: 'AG-SS-38R', price: 345000 },
        { name: '40R', sku: 'AG-SS-40R', price: 345000 },
        { name: '42R', sku: 'AG-SS-42R', price: 345000 },
      ],
    },
    {
      name: 'The Biarritz Pullover',
      slug: 'biarritz-pullover',
      description: 'A turtleneck in extra-fine merino wool — the ideal foundation for layering beneath tailoring.',
      facetValueIds: [categoryValues['Knitwear'].id, colourValues['Ecru'].id],
      collections: ['maison-hiver', 'the-foundation'],
      customFields: {
        fabricComposition: '100% Extra-fine Merino, 17.5 micron',
        careInstructions: 'Machine wash 30°C delicate.',
        madeIn: 'Crafted in Scotland',
        tailoringTime: 'Ready to ship in 2–3 business days',
        fittingType: 'regular',
        weightGsm: 290,
      },
      variants: [
        { name: 'S', sku: 'AG-BP-S', price: 89500 },
        { name: 'M', sku: 'AG-BP-M', price: 89500 },
        { name: 'L', sku: 'AG-BP-L', price: 89500 },
        { name: 'XL', sku: 'AG-BP-XL', price: 89500 },
      ],
    },
  ];

  for (const productData of products) {
    const product = await productService.create(ctx, {
      translations: [
        {
          languageCode: LanguageCode.en,
          name: productData.name,
          slug: productData.slug,
          description: productData.description,
        },
      ],
      facetValueIds: productData.facetValueIds.map((fv: any) => fv),
      customFields: productData.customFields,
    });

    await productVariantService.create(
      ctx,
      productData.variants.map((v) => ({
        productId: product.id,
        sku: v.sku,
        price: v.price,
        taxCategoryId: '1',
        translations: [{ languageCode: LanguageCode.en, name: v.name }],
      }))
    );

    // Assign to collections
    for (const collectionSlug of productData.collections) {
      const collection = createdCollections[collectionSlug];
      if (collection) {
        await collectionService.addProductsToCollection(ctx, collection.id, [product.id]);
      }
    }

    console.log(`[Seed] Created product: ${productData.name}`);
  }

  console.log('[Seed] Creating shipping methods...');
  const shippingService = app.get(ShippingMethodService);

  await shippingService.create(ctx, {
    code: 'maison-delivery',
    translations: [
      {
        languageCode: LanguageCode.en,
        name: 'Maison Delivery',
        description: '3–5 business days',
      },
    ],
    checker: { code: 'default-shipping-eligibility-checker', arguments: [] },
    calculator: {
      code: 'default-shipping-price-calculator',
      arguments: [
        { name: 'rate', value: '0' },
        { name: 'includesTax', value: 'true' },
        { name: 'taxRate', value: '20' },
      ],
    },
    fulfillmentHandler: 'manual-fulfillment',
  });

  await shippingService.create(ctx, {
    code: 'priority-delivery',
    translations: [
      {
        languageCode: LanguageCode.en,
        name: 'Priority Delivery',
        description: '1–2 business days',
      },
    ],
    checker: { code: 'default-shipping-eligibility-checker', arguments: [] },
    calculator: {
      code: 'default-shipping-price-calculator',
      arguments: [
        { name: 'rate', value: '2500' },
        { name: 'includesTax', value: 'true' },
        { name: 'taxRate', value: '20' },
      ],
    },
    fulfillmentHandler: 'manual-fulfillment',
  });

  console.log('[Seed] Creating payment method...');
  const paymentService = app.get(PaymentMethodService);

  await paymentService.create(ctx, {
    code: 'dummy-payment',
    translations: [{ languageCode: LanguageCode.en, name: 'Dummy Payment (Dev)' }],
    enabled: true,
    handler: { code: 'dummy-payment-handler', arguments: [] },
  });

  console.log('[Seed] ✓ Population complete!');
  await app.close();
  process.exit(0);
}

populate().catch((err) => {
  console.error('[Seed] Failed:', err);
  process.exit(1);
});
