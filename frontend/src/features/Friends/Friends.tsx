import React, { useContext, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';
import { rem } from 'polished';

import { useGetCurrentUser } from 'src/store/users/selectors';

import { NotificationsContext } from '../Dashboard/Notifications/Notifications';
import { FriendsTabsList } from './FriendsTabList/FriendsTabList';
import { DashboardPageLayout } from '../Dashboard/DashboardPageLayout/DashboardPageLayout';

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
  const { friends, invitedFriends, inviters, setFriendsState } = useContext(
    NotificationsContext
  );

  const [invite, { data }] = useMutation(AAA, {
    variables: { email: 'semik.lukasz@gmail.com' },
  });

  const invitedFriendData = data?.inviteFriend;

  useEffect(() => {
    if (!isEmpty(invitedFriendData)) {
      setFriendsState(invitedFriendData);
    }
  }, [invitedFriendData, setFriendsState]);

  return (
    <DashboardPageLayout>
      {currentUser.email === 'djpluki@gmail.com' && (
        <button onClick={() => invite()}>Invite</button>
      )}

      <FriendsTabsList />
    </DashboardPageLayout>
  );
};
