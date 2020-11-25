import { gql } from '@apollo/client';

export const ACCEPT_INVITATION = gql`
  mutation acceptInvitation($inviterId: String!) {
    acceptInvitation(inviterId: $inviterId) {
      inviters {
        id
        email
        nick
      }
      invitedFriends {
        id
        email
        nick
      }
      friends {
        id
        email
        nick
      }
    }
  }
`;
