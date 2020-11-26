import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FetchResult,
  MutationFunctionOptions,
  useMutation,
  useSubscription,
} from '@apollo/client';
import { rem } from 'polished';
import styled from 'styled-components';

import { useGetCurrentUser } from 'src/store/users/selectors';
import { User } from 'src/types/user';
import { routes } from 'src/constants/routes';
import {
  ControlButtonsWrapper,
  RejectButton,
  Spacer,
  SuccessButton,
} from 'src/components/Elements/FriendsList/FriendsList.styled';
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from 'src/components/Elements/ToastElement';

import {
  CONFIRM_GAME_INVITATION,
  CREATE_GAME,
  GAME_INVITATION_SUBSCRIPTION,
  REJECT_GAME_INVITATION,
} from './queries';

const MessageWrapper = styled.div`
  margin-bottom: ${rem(5)};
`;

export enum InvitationResponse {
  Invited = 'invited',
  InvitationConfirmed = 'invitationConfirmed',
  InvitationRejected = 'invitationRejected',
}

interface GameState {
  gameId: string;
  invitationResponse: InvitationResponse;
  oponent: User;
  creator: User;
  message: string;
}

interface ContextValues {
  gameState?: GameState;
  createdGameId?: string;
  createGame: (
    options?: MutationFunctionOptions<any, Record<string, any>>
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  rejectGame: (gameId: string) => Promise<void>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const GameContext = React.createContext({} as ContextValues);

export const GameContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [gameState, setGameState] = useState<GameState>();
  const currentUser = useGetCurrentUser();
  const toastIdRef = useRef<string | number>(null);
  const history = useHistory();

  const [createGame, { data: createdGameResponse }] = useMutation(CREATE_GAME);
  const createdGameId = createdGameResponse?.createGame.gameId;
  const [confirmGameInvitation] = useMutation(CONFIRM_GAME_INVITATION);
  const [rejectGameInvitation] = useMutation(REJECT_GAME_INVITATION);

  const { data: gameInvitationResponse } = useSubscription(
    GAME_INVITATION_SUBSCRIPTION,
    {
      variables: { id: currentUser.id },
    }
  );
  const gameInvitatioData = gameInvitationResponse?.gameInvitation;

  const rejectGame = useCallback(
    async (gameId: string) => {
      await rejectGameInvitation({
        variables: { gameId },
      });
      toast.dismiss(toastIdRef.current);
      notifyError('Game has been dissmissed');
    },
    [rejectGameInvitation]
  );

  useEffect(() => {
    if (gameInvitatioData) {
      setGameState(gameInvitatioData);

      const confirmGame = async () => {
        if (gameInvitatioData.gameId) {
          await confirmGameInvitation({
            variables: { gameId: gameInvitatioData.gameId },
          });
          history.push(routes.game(gameInvitatioData.gameId));
          toast.dismiss(toastIdRef.current);
          notifySuccess(`Let's play!`);
        } else {
          notifyError('Game has not been setup');
        }
      };

      if (gameInvitatioData.invitationResponse === InvitationResponse.Invited) {
        toastIdRef.current = notifyWarning(
          <>
            <MessageWrapper>{gameInvitatioData.message}</MessageWrapper>
            <ControlButtonsWrapper>
              <SuccessButton onClick={confirmGame}>Play</SuccessButton>
              <Spacer />
              <RejectButton
                onClick={() => rejectGame(gameInvitatioData.gameId)}
              >
                Reject
              </RejectButton>
            </ControlButtonsWrapper>
          </>,
          {
            autoClose: false,
          }
        );
      }
    }
  }, [gameInvitatioData, confirmGameInvitation, rejectGame, history]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        createGame,
        rejectGame,
        setGameState,
        createdGameId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
