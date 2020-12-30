import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useSubscription } from '@apollo/client';
import { last } from 'lodash';

import { useGetCurrentUser } from 'src/store/users/selectors';

import { MARK_TILE } from '../GamePanel/gql';
import { GameChangedData, GameState } from '../types';
import { GAME_CHANGED_SUBSCRIPTION } from './gql';

export const useOngoingGame = (
  isGameInitialized: boolean,
  gameId: string,
  setGameState: (gameState: GameState) => void
) => {
  const location = useLocation();
  const currentUser = useGetCurrentUser();

  const [markTileMutation, { data: markTileResponse }] = useMutation<{
    markTile: { gameData: GameState };
  }>(MARK_TILE);

  const { data: gameChangedResponse } = useSubscription<{
    gameChanged: GameChangedData;
  }>(GAME_CHANGED_SUBSCRIPTION, {
    variables: {
      userId: currentUser.id,
      gameId: last(location.pathname.split('/')),
    },
    skip: !isGameInitialized,
  });

  const gameData = gameChangedResponse?.gameChanged?.gameData;
  const markTileData = markTileResponse?.markTile?.gameData;

  const markTile = useCallback(
    async (tileId: string) => {
      await markTileMutation({
        variables: {
          tileId: tileId,
          gameId,
        },
      });
    },
    [gameId, markTileMutation]
  );

  useEffect(() => {
    if (gameData) {
      setGameState(gameData);
    }
  }, [gameData, setGameState]);

  useEffect(() => {
    if (markTileData) {
      setGameState(markTileData);
    }
  }, [markTileData, setGameState]);

  return {
    markTile,
  };
};
