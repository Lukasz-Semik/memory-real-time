import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useModalState } from 'src/hooks/useModalState';
import { User } from 'src/types/user';
import { routes } from 'src/constants/routes';
import {
  notifyError,
  notifySuccess,
} from 'src/components/Elements/ToastElement';

import { GameContext } from '../GameContext/GameContext';
import { InvitationResponse } from '../types';
import { GameInvitationModal } from './GameInvitationModal/GameInvitationModal';
import { GameWaitingModal } from './GameWaitingModal/GameWaitingModal';

interface Props {
  closeModal: () => void;
}

export const GameStarter = ({ closeModal }) => {
  const [invitedFriendNick, setInvitedFriendNick] = useState<string>();
  const [
    isWaitingModalOpen,
    openWaitingModal,
    closeWaitingModal,
  ] = useModalState();

  const { gameState, createGame, setGameState } = useContext(GameContext);
  const history = useHistory();

  const inviteUser = useCallback(
    (friend: User) => {
      setInvitedFriendNick(friend.nick);
      createGame({ variables: { oponentId: friend.id } });
      openWaitingModal();
    },
    [createGame, openWaitingModal]
  );

  useEffect(() => {
    if (
      gameState?.invitationResponse === InvitationResponse.InvitationConfirmed
    ) {
      notifySuccess(`${gameState?.oponent?.nick} accepted game invitation`);
      history.push(routes.game(gameState?.gameId));
      return;
    }

    if (
      isWaitingModalOpen &&
      gameState?.invitationResponse === InvitationResponse.InvitationRejected
    ) {
      notifyError('Game has been dissmised');
      closeWaitingModal();
      setGameState(undefined);
      return;
    }
  }, [gameState, history, closeWaitingModal, isWaitingModalOpen, setGameState]);

  return (
    <>
      <GameInvitationModal closeModal={closeModal} inviteUser={inviteUser} />

      {isWaitingModalOpen && (
        <GameWaitingModal
          invitedFriendNick={invitedFriendNick}
          closeModal={closeWaitingModal}
        />
      )}
    </>
  );
};
