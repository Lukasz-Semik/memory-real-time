import React, { useEffect, useState } from 'react';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { isEmpty } from 'lodash';

import { useGetCurrentUser } from 'src/store/users/selectors';
import { User } from 'src/types/user';
import { notifySuccess } from 'src/components/Elements/ToastElement';

import { FETCH_FRIENDS_DATA, FRIENDS_DATA_CHANGED_SUBSCRIPTION } from './gql';

interface State {
  inviters: User[];
  invitedFriends: User[];
  friends: User[];
}

interface ContextValues extends State {
  isLoadingFriends: boolean;
  fetchFriends: () => void;
  setFriendsState: React.Dispatch<React.SetStateAction<State>>;
}

export const NotificationsContext = React.createContext({} as ContextValues);

export const NotificationsContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [state, setState] = useState<State>({
    inviters: [],
    invitedFriends: [],
    friends: [],
  });
  const currentUser = useGetCurrentUser();
  const [fetchFriends, { data: friendsDataResponse, loading }] = useLazyQuery(
    FETCH_FRIENDS_DATA
  );
  const friendsData = friendsDataResponse?.getFriendsData;

  const { data: friendsSubDataResponse } = useSubscription(
    FRIENDS_DATA_CHANGED_SUBSCRIPTION,
    {
      variables: { id: currentUser.id },
    }
  );
  const friendsSubData = friendsSubDataResponse?.friendsDataChanged;

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  useEffect(() => {
    setState({
      friends: friendsData?.friends || [],
      invitedFriends: friendsData?.invitedFriends || [],
      inviters: friendsData?.inviters || [],
    });
  }, [friendsData]);

  useEffect(() => {
    if (!isEmpty(friendsSubData)) {
      setState({
        friends: friendsSubData.friends || [],
        invitedFriends: friendsSubData.invitedFriends || [],
        inviters: friendsSubData.inviters || [],
      });
      notifySuccess(friendsSubData.message);
    }
  }, [friendsSubData]);

  return (
    <NotificationsContext.Provider
      value={{
        isLoadingFriends: loading,
        friends: state.friends || [],
        invitedFriends: state.invitedFriends || [],
        inviters: state.inviters || [],
        setFriendsState: setState,
        fetchFriends,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
