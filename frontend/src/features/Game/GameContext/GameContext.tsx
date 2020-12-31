import React, { useCallback, useState } from 'react';
import { FetchResult, MutationFunctionOptions } from '@apollo/client';

import { BoardInternalState, GameState, InvitationState } from '../types';
import { SetStates, useGameInvitation } from './useGameInvitation';
import { useOngoingGame } from './useOngoingGame';

interface ContextValues {
  gameState?: GameState;
  invitationState?: InvitationState;
  isGameInitialized: boolean;
  initilizeGame: () => void;
  createdGameId?: string;
  createGame: (
    options?: MutationFunctionOptions<any, Record<string, any>>
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  rejectGame: (gameId: string) => Promise<void>;
  cancelGame: () => Promise<void>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  markTile: (tileId: string) => Promise<void>;
  boardInternalState: BoardInternalState;
}

export const GameContext = React.createContext({} as ContextValues);

export const GameContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [isGameInitialized, setIsGameInitialized] = useState(false);
  const [gameState, setGameState] = useState<GameState>();
  const [boardInternalState, setBoartInternalState] = useState<
    BoardInternalState
  >({ isBoardDisabled: false, notMatchedTileId: null });
  const [invitationState, setInvitationState] = useState<InvitationState>();

  const setStates = useCallback<SetStates>(
    (providedGameState, providedInvitationState) => {
      setGameState(providedGameState);
      setInvitationState(providedInvitationState);
    },
    []
  );

  const { markTile } = useOngoingGame({
    isGameInitialized,
    setGameState,
    setBoartInternalState,
    gameId: gameState?.id,
  });

  const {
    createGame,
    createdGameId,
    rejectGame,
    cancelGame,
  } = useGameInvitation(setStates);

  return (
    <GameContext.Provider
      value={{
        gameState,
        invitationState,
        isGameInitialized,
        initilizeGame: () => setIsGameInitialized(true),
        createGame,
        rejectGame,
        cancelGame,
        setGameState,
        createdGameId,
        markTile,
        boardInternalState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
