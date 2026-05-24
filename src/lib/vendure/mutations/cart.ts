export const ADD_ITEM_TO_ORDER = /* GraphQL */ `
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order {
        id
        code
        state
        totalQuantity
        subTotalWithTax
        totalWithTax
        shippingWithTax
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
              featuredAsset { id preview }
            }
            options {
              id code name
              group { id name code }
            }
          }
        }
      }
      ... on OrderModificationError { errorCode message }
      ... on OrderLimitError { errorCode message maxItems }
      ... on NegativeQuantityError { errorCode message }
      ... on InsufficientStockError { errorCode message quantityAvailable order { id } }
    }
  }
`;

export const ADJUST_ORDER_LINE = /* GraphQL */ `
  mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ... on Order {
        id
        totalQuantity
        subTotalWithTax
        totalWithTax
        lines {
          id
          quantity
          unitPriceWithTax
          linePriceWithTax
          productVariant {
            id name sku
            product { id name slug featuredAsset { id preview } }
          }
        }
      }
      ... on OrderModificationError { errorCode message }
      ... on NegativeQuantityError { errorCode message }
      ... on InsufficientStockError { errorCode message quantityAvailable }
    }
  }
`;

export const REMOVE_ORDER_LINE = /* GraphQL */ `
  mutation RemoveOrderLine($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      ... on Order {
        id
        totalQuantity
        subTotalWithTax
        totalWithTax
        lines {
          id quantity unitPriceWithTax linePriceWithTax
          productVariant {
            id name sku
            product { id name slug featuredAsset { id preview } }
          }
        }
      }
      ... on OrderModificationError { errorCode message }
    }
  }
`;
