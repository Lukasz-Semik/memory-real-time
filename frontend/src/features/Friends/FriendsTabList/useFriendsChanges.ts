import { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { NotificationsContext } from 'src/features/Dashboard/Notifications/Notifications';
import { notifySuccess } from 'src/components/Elements/ToastElement';

import {
  ACCEPT_INVITATION,
  CANCEL_INVITATION,
  REJECT_INVITATION,
  REMOVE_FRIEND,
} from './queries';

export const useFriendsChanges = () => {
  const { setFriendsState } = useContext(NotificationsContext);
  const [acceptInvitation, { data: acceptInvitationData }] = useMutation(
    ACCEPT_INVITATION
  );
  const friendsAfterAcceptInvitation = acceptInvitationData?.acceptInvitation;

  const [rejectInvitation, { data: rejectInvitationData }] = useMutation(
    REJECT_INVITATION
  );
  const friendsAfterRejectInvitation = rejectInvitationData?.rejectInvitation;

  const [cancelInvitation, { data: cancelledInvitationData }] = useMutation(
    CANCEL_INVITATION
  );
  const friendsAfterCancelInvitation =
    cancelledInvitationData?.cancelInvitation;

  const [removeFriend, { data: removeFriendData }] = useMutation(REMOVE_FRIEND);
  const friendsAfterRemoveFriend = removeFriendData?.removeFriend;

  useEffect(() => {
    if (friendsAfterAcceptInvitation) {
      setFriendsState(friendsAfterAcceptInvitation);
      notifySuccess('Invitation has been accepted successfully');
    }
  }, [friendsAfterAcceptInvitation, setFriendsState]);

  useEffect(() => {
    if (friendsAfterRejectInvitation) {
      setFriendsState(friendsAfterRejectInvitation);
      notifySuccess('Invitation has been rejected successfully');
    }
  }, [friendsAfterRejectInvitation, setFriendsState]);

  useEffect(() => {
    if (friendsAfterCancelInvitation) {
      setFriendsState(friendsAfterCancelInvitation);
      notifySuccess('Invitation has been cancelled successfully');
    }
  }, [friendsAfterCancelInvitation, setFriendsState]);

  useEffect(() => {
    if (friendsAfterRemoveFriend) {
      setFriendsState(friendsAfterRemoveFriend);
      notifySuccess('Friend has been removed successfully');
    }
  }, [friendsAfterRemoveFriend, setFriendsState]);

  return {
    acceptInvitation,
    rejectInvitation,
    removeFriend,
    cancelInvitation,
  };
};
