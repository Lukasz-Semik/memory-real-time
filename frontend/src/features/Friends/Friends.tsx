import React, { useEffect } from 'react';
import {
  gql,
  useLazyQuery,
  useMutation,
  useSubscription,
} from '@apollo/client';
import { rem } from 'polished';

import { useGetCurrentUser } from 'src/store/users/selectors';
import { current } from '@reduxjs/toolkit';

const FETCH_FRIENDS_DATA = gql`
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

const FRIENDS_DATA_CHANGED_SUBSCRIPTION = gql`
  subscription friendsDataChanged($id: String!) {
    friendsDataChanged(id: $id) {
      message
      aimedUserId
      inviters {
        nick
      }
      invitedFriends {
        nick
      }
      friends {
        nick
      }
    }
  }
`;

const AAA = gql`
  mutation PerformSignUp($email: String!) {
    inviteFriend(email: $email) {
      inviters {
        nick
      }
      invitedFriends {
        nick
      }
      friends {
        nick
      }
    }
  }
`;

export const Friends = () => {
  const currentUser = useGetCurrentUser();
  const [fetchUser, { data }] = useLazyQuery(FETCH_FRIENDS_DATA);
  const [invite] = useMutation(AAA, {
    variables: { email: 'semik.lukasz@gmail.com' },
  });
  console.log({ data });

  const { data: subData, ...rest } = useSubscription(
    FRIENDS_DATA_CHANGED_SUBSCRIPTION,
    {
      variables: { id: currentUser.id },
    }
  );

  console.log({ subData, rest });
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div style={{ paddingLeft: rem(300) }}>
      {currentUser.email === 'djpluki@gmail.com' && (
        <button onClick={() => invite()}>Invite</button>
      )}
      Friends
    </div>
  );
};
