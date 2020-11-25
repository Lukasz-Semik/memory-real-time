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

export const REJECT_INVITATION = gql`
  mutation rejectInvitation($inviterId: String!) {
    rejectInvitation(inviterId: $inviterId) {
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

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: String!) {
    removeFriend(friendId: $friendId) {
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

export const CANCEL_INVITATION = gql`
  mutation cancelInvitation($invitedFriendId: String!) {
    cancelInvitation(invitedFriendId: $invitedFriendId) {
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
