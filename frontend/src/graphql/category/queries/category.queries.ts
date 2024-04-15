import { gql } from '@apollo/client';

const LIST_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

export default LIST_CATEGORIES;
