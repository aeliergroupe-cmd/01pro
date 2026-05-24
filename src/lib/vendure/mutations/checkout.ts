export const SET_ORDER_SHIPPING_ADDRESS = /* GraphQL */ `
  mutation SetOrderShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      ... on Order {
        id
        shippingAddress {
          fullName streetLine1 streetLine2 city province postalCode country
        }
      }
      ... on NoActiveOrderError { errorCode message }
    }
  }
`;

export const GET_ELIGIBLE_SHIPPING_METHODS = /* GraphQL */ `
  query GetEligibleShippingMethods {
    eligibleShippingMethods {
      id
      name
      description
      priceWithTax
      price
    }
  }
`;

export const SET_ORDER_SHIPPING_METHOD = /* GraphQL */ `
  mutation SetOrderShippingMethod($shippingMethodId: [ID!]!) {
    setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
      ... on Order {
        id
        shippingWithTax
        totalWithTax
        shippingLines {
          shippingMethod { id name description }
          priceWithTax
        }
      }
      ... on OrderModificationError { errorCode message }
      ... on IneligibleShippingMethodError { errorCode message }
      ... on NoActiveOrderError { errorCode message }
    }
  }
`;

export const SET_CUSTOMER_FOR_ORDER = /* GraphQL */ `
  mutation SetCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      ... on Order { id customer { id emailAddress firstName lastName } }
      ... on AlreadyLoggedInError { errorCode message }
      ... on EmailAddressConflictError { errorCode message }
      ... on NoActiveOrderError { errorCode message }
      ... on GuestCheckoutForbiddenError { errorCode message }
    }
  }
`;

export const ADD_PAYMENT_TO_ORDER = /* GraphQL */ `
  mutation AddPaymentToOrder($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      ... on Order {
        id
        code
        state
        totalWithTax
        payments {
          id method amount state transactionId errorMessage
        }
      }
      ... on OrderPaymentStateError { errorCode message }
      ... on IneligiblePaymentMethodError { errorCode message eligibilityCheckerMessage }
      ... on PaymentFailedError { errorCode message paymentErrorMessage }
      ... on PaymentDeclinedError { errorCode message paymentErrorMessage }
      ... on OrderStateTransitionError { errorCode message transitionError fromState toState }
      ... on NoActiveOrderError { errorCode message }
    }
  }
`;

export const TRANSITION_ORDER_TO_STATE = /* GraphQL */ `
  mutation TransitionOrderToState($state: String!) {
    transitionOrderToState(state: $state) {
      ... on Order { id code state }
      ... on OrderStateTransitionError {
        errorCode message transitionError fromState toState
      }
    }
  }
`;
