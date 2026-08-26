export const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    health: String!
    currentUser: User
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
  }
`;