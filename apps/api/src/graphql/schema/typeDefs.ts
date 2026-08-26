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

  type GameResult {
    id: ID!
    completionTime: Float!
    correctCharacters: Int!
    wrongAttempts: Int!
    penaltyTime: Float!
    finalTime: Float!
    sequence: String!
    createdAt: String!
  }

  type LeaderboardEntry {
    id: ID!
    finalTime: Float!
    wrongAttempts: Int!
    penaltyTime: Float!
    createdAt: String!
    user: LeaderboardUser!
  }

  type LeaderboardUser {
    id: ID!
    username: String!
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

  input SaveGameResultInput {
    completionTime: Float!
    correctCharacters: Int!
    wrongAttempts: Int!
    sequence: String!
  }

  type Query {
    health: String!
    currentUser: User

    gameHistory: [GameResult!]!
    bestScore: GameResult
    leaderboard(limit: Int = 10): [LeaderboardEntry!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!

    saveGameResult(
      input: SaveGameResultInput!
    ): GameResult!
  }
`;