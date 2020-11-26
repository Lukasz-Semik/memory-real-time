import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FetchResult, MutationFunctionOptions } from '@apollo/client';

import {
  notifyError,
  notifyWarning,
} from 'src/components/Elements/ToastElement';

import { GameState, InvitationResponse } from '../types';
import { GameInvitationToast } from './GameInvitationToast';
import { useGameInvitation } from './useGameInvitation';

interface ContextValues {
  gameState?: GameState;
  createdGameId?: string;
  createGame: (
    options?: MutationFunctionOptions<any, Record<string, any>>
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  rejectGame: (gameId: string) => Promise<void>;
  cancelGame: () => Promise<void>;
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
    cancelGame,
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

      if (
        gameInvitatioData.invitationResponse ===
        InvitationResponse.InvitationCancelled
      ) {
        setGameState(undefined);
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
  ]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        createGame,
        rejectGame,
        cancelGame,
        setGameState,
        createdGameId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
