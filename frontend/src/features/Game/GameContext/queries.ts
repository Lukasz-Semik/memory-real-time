import { gql } from '@apollo/client';

export const GAME_INVITATION_SUBSCRIPTION = gql`
  subscription gameInvitation($id: String!) {
    gameInvitation(id: $id) {
      gameId
      invitationResponse
      message
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
`;

export const CREATE_GAME = gql`
  mutation createGame($oponentId: String!) {
    createGame(oponentId: $oponentId) {
      gameId
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
