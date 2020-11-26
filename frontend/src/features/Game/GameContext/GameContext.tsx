import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FetchResult, MutationFunctionOptions } from '@apollo/client';

import { User } from 'src/types/user';
import { notifyWarning } from 'src/components/Elements/ToastElement';

import { GameInvitationToast } from './GameInvitationToast';
import { useGameInvitation } from './useGameInvitation';

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
  const toastIdRef = useRef<string | number>(null);
  const history = useHistory();

  const {
    createGame,
    createdGameId,
    gameInvitatioData,
    rejectGame,
    confirmGame,
  } = useGameInvitation();

  const dismissConfirmationToast = useCallback(() => {
    toast.dismiss(toastIdRef.current);
  }, []);

  useEffect(() => {
    if (gameInvitatioData) {
      setGameState(gameInvitatioData);

      if (gameInvitatioData.invitationResponse === InvitationResponse.Invited) {
        toastIdRef.current = notifyWarning(
          <GameInvitationToast
            message={gameInvitatioData.message}
            confirm={() =>
              confirmGame(gameInvitatioData.gameId).then(
                dismissConfirmationToast
              )
            }
            reject={() =>
              rejectGame(gameInvitatioData.gameId).then(
                dismissConfirmationToast
              )
            }
          />,
          {
            autoClose: false,
          }
        );
      }
    }
  }, [
    gameInvitatioData,
    dismissConfirmationToast,
    confirmGame,
    rejectGame,
    history,
  ]);

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
