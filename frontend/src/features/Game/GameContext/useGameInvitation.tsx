import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useSubscription } from '@apollo/client';
import { InvitationResponse } from 'global-types';

import { useGetCurrentUser } from 'src/store/users/selectors';
import { routes } from 'src/constants/routes';
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from 'src/components/Elements/ToastElement';

import { GameState, InvitationData, InvitationState } from '../types';
import { GameInvitationToast } from './GameInvitationToast';
import {
  CANCEL_GAME_INVITATION,
  CONFIRM_GAME_INVITATION,
  CREATE_GAME,
  GAME_INVITATION_SUBSCRIPTION,
  REJECT_GAME_INVITATION,
} from './gql';

export type SetStates = (
  gameState?: GameState,
  invitationState?: InvitationState
) => void;

export const useGameInvitation = (setStates: SetStates) => {
  const currentUser = useGetCurrentUser();
  const history = useHistory();
  const toastIdRef = useRef<string | number>(null);

  const [createGame, { data: createdGameResponse }] = useMutation<{
    createGame: InvitationData;
  }>(CREATE_GAME);
  const createdGameId = createdGameResponse?.createGame.gameData.id;

  const [confirmGameInvitation] = useMutation(CONFIRM_GAME_INVITATION);
  const [rejectGameInvitation] = useMutation(REJECT_GAME_INVITATION);
  const [cancelGameInvitation] = useMutation(CANCEL_GAME_INVITATION);

  const { data: gameInvitationResponse } = useSubscription<{
    gameInvitation: InvitationData;
  }>(GAME_INVITATION_SUBSCRIPTION, {
    variables: { id: currentUser.id },
  });
  const gameInvitatioData = gameInvitationResponse?.gameInvitation;

  const rejectGame = useCallback(
    async (gameId: string) => {
      await rejectGameInvitation({
        variables: { gameId },
      });
      notifyError('Game has been dismissed');
    },
    [rejectGameInvitation]
  );

  const cancelGame = useCallback(async () => {
    await cancelGameInvitation({
      variables: { gameId: createdGameId },
    });
  }, [cancelGameInvitation, createdGameId]);

  const confirmGame = useCallback(
    async (gameId: string) => {
      await confirmGameInvitation({
        variables: { gameId },
      });
      history.push(routes.game(gameId));
      notifySuccess(`Let's play!`);
    },
    [history, confirmGameInvitation]
  );

  const dismissConfirmationToast = useCallback(() => {
    toast.dismiss(toastIdRef.current);
  }, []);

  useEffect(() => {
    if (gameInvitatioData) {
      setStates(gameInvitatioData.gameData, {
        message: gameInvitatioData.message,
        invitationResponse: gameInvitatioData.invitationResponse,
      });

      if (gameInvitatioData.invitationResponse === InvitationResponse.Invited) {
        toastIdRef.current = notifyWarning(
          <GameInvitationToast
            message={gameInvitatioData.message}
            confirm={() =>
              confirmGame(gameInvitatioData.gameData.id).then(
                dismissConfirmationToast
              )
            }
            reject={() =>
              rejectGame(gameInvitatioData.gameData.id).then(
                dismissConfirmationToast
              )
            }
          />,
          {
            autoClose: false,
          }
        );
      }

      if (
        gameInvitatioData.invitationResponse ===
        InvitationResponse.InvitationCancelled
      ) {
        setStates();
        dismissConfirmationToast();
        notifyError('Game has been dismissed');
      }
    }
  }, [
    gameInvitatioData,
    dismissConfirmationToast,
    confirmGame,
    rejectGame,
    history,
    setStates,
  ]);

  return {
    createGame,
    createdGameId,
    gameInvitatioData,
    rejectGame,
    confirmGame,
    cancelGame,
  };
};
