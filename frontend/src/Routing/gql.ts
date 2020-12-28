import { gql } from '@apollo/client';

export const FETCH_USER = gql`
  query FetchUser {
    me {
      id
      nick
      email
    }
  }
`;
