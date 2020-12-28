import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useSubscription } from '@apollo/client';

import { useGetCurrentUser } from 'src/store/users/selectors';
import { routes } from 'src/constants/routes';
import {
  notifyError,
  notifySuccess,
} from 'src/components/Elements/ToastElement';

import { InvitationData } from '../types';
import {
  CANCEL_GAME_INVITATION,
  CONFIRM_GAME_INVITATION,
  CREATE_GAME,
  GAME_INVITATION_SUBSCRIPTION,
  REJECT_GAME_INVITATION,
} from './gql';

export const useGameInvitation = () => {
  const currentUser = useGetCurrentUser();
  const history = useHistory();

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

  return {
    createGame,
    createdGameId,
    gameInvitatioData,
    rejectGame,
    confirmGame,
    cancelGame,
  };
};
