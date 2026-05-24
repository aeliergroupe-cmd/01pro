export const LOGIN = /* GraphQL */ `
  mutation Login($username: String!, $password: String!, $rememberMe: Boolean) {
    login(username: $username, password: $password, rememberMe: $rememberMe) {
      ... on CurrentUser {
        id
        identifier
        channels {
          id
          token
          permissions
        }
      }
      ... on InvalidCredentialsError { errorCode message authenticationError }
      ... on NotVerifiedError { errorCode message }
    }
  }
`;

export const LOGOUT = /* GraphQL */ `
  mutation Logout {
    logout {
      success
    }
  }
`;

export const REGISTER_CUSTOMER = /* GraphQL */ `
  mutation RegisterCustomer($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      ... on Success { success }
      ... on MissingPasswordError { errorCode message }
      ... on PasswordValidationError { errorCode message validationErrorMessage }
      ... on NativeAuthStrategyError { errorCode message }
    }
  }
`;

export const GET_CURRENT_CUSTOMER = /* GraphQL */ `
  query GetCurrentCustomer {
    activeCustomer {
      id
      emailAddress
      firstName
      lastName
      phoneNumber
      addresses {
        id
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        countryCode
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
      }
      customFields {
        vipTier
        clientAdvisorId
        preferredAtelier
        totalLifetimeSpend
      }
    }
  }
`;

export const UPDATE_CUSTOMER = /* GraphQL */ `
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
    }
  }
`;

export const GET_ORDER_LIST = /* GraphQL */ `
  query GetOrderList($options: OrderListOptions) {
    activeCustomer {
      orders(options: $options) {
        totalItems
        items {
          id
          code
          state
          totalWithTax
          currencyCode
          createdAt
          updatedAt
          lines {
            id quantity
            productVariant {
              id name sku
              product {
                id name slug
                featuredAsset { id preview }
              }
            }
          }
        }
      }
    }
  }
`;
