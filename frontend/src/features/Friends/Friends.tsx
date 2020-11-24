import React, { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { rem } from 'polished';

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

export const Friends = () => {
  const [fetchUser, { data }] = useLazyQuery(FETCH_FRIENDS_DATA);

  console.log(data);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <div style={{ paddingLeft: rem(300) }}>Friends</div>;
};
