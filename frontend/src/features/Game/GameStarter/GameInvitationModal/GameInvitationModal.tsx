import React, { useContext } from 'react';
import { rem } from 'polished';

import { User } from 'src/types/user';
import { NotificationsContext } from 'src/features/Dashboard/Notifications/Notifications';
import { FriendsList } from 'src/components/Elements/FriendsList/FriendsList';
import {
  ControlButtonsWrapper,
  SuccessButton,
} from 'src/components/Elements/FriendsList/FriendsList.styled';
import { ModalElement } from 'src/components/Elements/ModalElement/ModalElement';

import { GameStarterLoader } from '../GameStarterLoader/GameStarterLoader';

interface Props {
  inviteUser: (user: User) => void;
  closeModal: () => void;
}

export const GameInvitationModal = ({ inviteUser, closeModal }: Props) => {
  const { friends, isLoadingFriends } = useContext(NotificationsContext);

  return (
    <ModalElement
      minWidth={rem(590)}
      title="Play with friend"
      close={closeModal}
      isOpen
    >
      {isLoadingFriends ? (
        <GameStarterLoader />
      ) : (
        <FriendsList
          friends={friends}
          renderControls={friend => (
            <ControlButtonsWrapper>
              <SuccessButton onClick={() => inviteUser(friend)}>
                Play the game!
              </SuccessButton>
            </ControlButtonsWrapper>
          )}
        />
      )}
    </ModalElement>
  );
};
