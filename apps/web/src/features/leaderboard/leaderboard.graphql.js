import { gql } from "@apollo/client";

export const GET_LEADERBOARD = gql`
  query GetLeaderboard($limit: Int) {
    leaderboard(limit: $limit) {
      id
      finalTime
      wrongAttempts
      penaltyTime
      createdAt
      user {
        id
        username
      }
    }
  }
`;