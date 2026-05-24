export const CREATE_CUSTOMER_ADDRESS = /* GraphQL */ `
  mutation CreateCustomerAddress($input: CreateAddressInput!) {
    createCustomerAddress(input: $input) {
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
  }
`;

export const UPDATE_CUSTOMER_ADDRESS = /* GraphQL */ `
  mutation UpdateCustomerAddress($input: UpdateAddressInput!) {
    updateCustomerAddress(input: $input) {
      id
      fullName
      streetLine1
      streetLine2
      city
      province
      postalCode
      countryCode
      defaultShippingAddress
      defaultBillingAddress
    }
  }
`;

export const DELETE_CUSTOMER_ADDRESS = /* GraphQL */ `
  mutation DeleteCustomerAddress($id: ID!) {
    deleteCustomerAddress(id: $id) {
      success
    }
  }
`;
