import { gql } from '@apollo/client';

export const GET_GAME_DATA = gql`
  query getGame($gameId: String!) {
    getGame(gameId: $gameId) {
      gameData {
        id
        currentPlayer
        roundCount
        tiles {
          markedBy
          id
          name
        }
        score {
          creator
          oponent
        }
        oponent {
          id
          nick
          email
        }
        creator {
          id
          nick
          email
        }
      }
    }
  }
`;

export const MARK_TILE = gql`
  mutation markTile($tileId: String!, $gameId: String!) {
    markTile(tileId: $tileId, gameId: $gameId) {
      gameData {
        id
        currentPlayer
        roundCount
        tiles {
          markedBy
          id
          name
        }
        score {
          creator
          oponent
        }
        oponent {
          id
          nick
          email
        }
        creator {
          id
          nick
          email
        }
      }
    }
  }
`;
