export const GET_ACTIVE_ORDER = /* GraphQL */ `
  query GetActiveOrder {
    activeOrder {
      id
      code
      state
      totalQuantity
      subTotalWithTax
      totalWithTax
      shippingWithTax
      currencyCode
      lines {
        id
        quantity
        unitPriceWithTax
        linePriceWithTax
        productVariant {
          id
          name
          sku
          product {
            id
            name
            slug
            featuredAsset {
              id
              preview
            }
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
      }
      shippingLines {
        shippingMethod {
          id
          name
          description
        }
        priceWithTax
      }
    }
  }
`;
