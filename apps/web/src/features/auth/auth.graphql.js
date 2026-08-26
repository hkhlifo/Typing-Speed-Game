import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      email
    }
  }
`;