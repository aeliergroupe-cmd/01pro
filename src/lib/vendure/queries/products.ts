export const SEARCH_PRODUCTS = /* GraphQL */ `
  query SearchProducts($input: SearchInput!) {
    search(input: $input) {
      totalItems
      items {
        productId
        productVariantId
        productName
        slug
        description
        priceWithTax {
          ... on SinglePrice {
            value
          }
          ... on PriceRange {
            min
            max
          }
        }
        currencyCode
        productAsset {
          id
          preview
          focalPoint {
            x
            y
          }
        }
        facetValueIds
        collectionIds
      }
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
            code
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = /* GraphQL */ `
  query GetProduct($slug: String!) {
    product(slug: $slug) {
      id
      name
      slug
      description
      assets {
        id
        preview
        source
        focalPoint {
          x
          y
        }
      }
      featuredAsset {
        id
        preview
        source
        focalPoint {
          x
          y
        }
      }
      facetValues {
        id
        name
        facet {
          name
          code
        }
      }
      variants {
        id
        name
        sku
        priceWithTax
        currencyCode
        stockLevel
        featuredAsset {
          id
          preview
        }
        options {
          id
          code
          name
          group {
            id
            name
            code
          }
        }
      }
      customFields {
        fabricComposition
        careInstructions
        madeIn
        tailoringTime
        fittingType
        weightGsm
        liningComposition
        constructionNotes
      }
      collections {
        id
        name
        slug
      }
    }
  }
`;

export const GET_PRODUCTS_BY_COLLECTION = /* GraphQL */ `
  query GetProductsByCollection($slug: String!, $take: Int, $skip: Int) {
    collection(slug: $slug) {
      id
      name
      slug
      description
      featuredAsset {
        id
        preview
      }
      productVariants(options: { take: $take, skip: $skip }) {
        totalItems
        items {
          id
          name
          priceWithTax
          currencyCode
          stockLevel
          product {
            id
            name
            slug
            description
            featuredAsset {
              id
              preview
              focalPoint { x y }
            }
          }
        }
      }
    }
  }
`;
