import { gql } from '@apollo/client';

export const FETCH_FRIENDS_DATA = gql`
  query FetchFriendsData {
    getFriendsData {
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

export const FRIENDS_DATA_CHANGED_SUBSCRIPTION = gql`
  subscription friendsDataChanged($id: String!) {
    friendsDataChanged(id: $id) {
      message
      aimedUserId
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
