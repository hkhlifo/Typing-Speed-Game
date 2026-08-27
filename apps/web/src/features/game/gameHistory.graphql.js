import { gql } from "@apollo/client";

export const GET_GAME_HISTORY = gql`
  query GetGameHistory {
    gameHistory {
      id
      completionTime
      correctCharacters
      wrongAttempts
      penaltyTime
      finalTime
      sequence
      createdAt
    }
  }
`;

export const GET_MY_BEST_SCORE = gql`
  query GetMyBestScore {
    bestScore {
      id
      finalTime
      completionTime
      wrongAttempts
      penaltyTime
      createdAt
    }
  }
`;