import { gql } from '@apollo/client';

export const GAME_INVITATION_SUBSCRIPTION = gql`
  subscription gameInvitation($id: String!) {
    gameInvitation(id: $id) {
      invitationResponse
      message
      gameData {
        id
        currentPlayer
        roundCount
        isGameOver
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

export const CREATE_GAME = gql`
  mutation createGame($oponentId: String!) {
    createGame(oponentId: $oponentId) {
      gameData {
        id
        currentPlayer
        roundCount
        isGameOver
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

export const CONFIRM_GAME_INVITATION = gql`
  mutation confirmGameInvitation($gameId: String!) {
    confirmGameInvitation(gameId: $gameId)
  }
`;

export const REJECT_GAME_INVITATION = gql`
  mutation rejectGameInvitation($gameId: String!) {
    rejectGameInvitation(gameId: $gameId)
  }
`;

export const CANCEL_GAME_INVITATION = gql`
  mutation cancelGameInvitation($gameId: String!) {
    cancelGameInvitation(gameId: $gameId)
  }
`;

export const GAME_CHANGED_SUBSCRIPTION = gql`
  subscription gameChanged($userId: String!, $gameId: String!) {
    gameChanged(userId: $userId, gameId: $gameId) {
      notMatchedTileId
      matchResult
      gameData {
        id
        currentPlayer
        roundCount
        isGameOver
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

export const GET_GAME_DATA = gql`
  query getGame($gameId: String!) {
    getGame(gameId: $gameId) {
      gameData {
        id
        currentPlayer
        roundCount
        isGameOver
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
      matchResult
      notMatchedTileId
      gameData {
        id
        currentPlayer
        roundCount
        isGameOver
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
