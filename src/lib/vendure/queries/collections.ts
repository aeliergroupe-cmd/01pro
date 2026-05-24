export const GET_COLLECTIONS = /* GraphQL */ `
  query GetCollections {
    collections {
      items {
        id
        name
        slug
        description
        featuredAsset {
          id
          preview
          focalPoint { x y }
        }
        parent {
          id
          name
          slug
        }
      }
    }
  }
`;

export const GET_COLLECTION = /* GraphQL */ `
  query GetCollection($slug: String!) {
    collection(slug: $slug) {
      id
      name
      slug
      description
      featuredAsset {
        id
        preview
        focalPoint { x y }
      }
      children {
        id
        name
        slug
      }
    }
  }
`;
