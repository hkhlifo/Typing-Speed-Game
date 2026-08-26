import { gql } from "@apollo/client";

export const SAVE_GAME_RESULT = gql`
  mutation SaveGameResult($input: SaveGameResultInput!) {
    saveGameResult(input: $input) {
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