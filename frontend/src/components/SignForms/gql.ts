import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $nick: String!) {
    createUser(data: { email: $email, password: $password, nick: $nick }) {
      nick
    }
  }
`;
