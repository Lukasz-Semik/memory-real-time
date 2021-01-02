import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useSubscription } from '@apollo/client';
import { MatchResult } from 'global-types';
import { last } from 'lodash';

import { useGetCurrentUser } from 'src/store/users/selectors';

import { MARK_TILE } from '../gql';
import { GAME_CHANGED_SUBSCRIPTION } from '../gql';
import { BoardInternalState, GameChangedData, GameState } from '../types';

interface Config {
  isGameInitialized: boolean;
  gameId: string;
  setBoartInternalState: React.Dispatch<
    React.SetStateAction<BoardInternalState>
  >;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useOngoingGame = ({
  isGameInitialized,
  gameId,
  setBoartInternalState,
  setGameState,
}: Config) => {
  const location = useLocation();
  const currentUser = useGetCurrentUser();

  const [markTileMutation, { data: markTileResponse }] = useMutation<{
    markTile: GameChangedData;
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

  const gameChangedData = gameChangedResponse?.gameChanged;
  const markTileData = markTileResponse?.markTile;

  const markTile = useCallback(
    async (tileId: string) => {
      setBoartInternalState(prevState => ({
        ...prevState,
        isBoardDisabled: true,
      }));

      await markTileMutation({
        variables: {
          tileId: tileId,
          gameId,
        },
      });
    },
    [gameId, markTileMutation, setBoartInternalState]
  );

  const update = useCallback(
    (gameState: GameState, matchResult: MatchResult) => {
      setGameState(gameState);
      setBoartInternalState({
        isBoardDisabled: false,
        notMatchedTileId: null,
        matchResult,
      });
    },
    [setGameState, setBoartInternalState]
  );

  useEffect(() => {
    if (gameChangedData) {
      if (gameChangedData.matchResult === MatchResult.NotMatched) {
        setBoartInternalState({
          isBoardDisabled: true,
          notMatchedTileId: gameChangedData.notMatchedTileId,
          matchResult: gameChangedData.matchResult,
        });

        setTimeout(() => {
          update(gameChangedData.gameData, gameChangedData.matchResult);
        }, 3000);
      } else {
        update(gameChangedData.gameData, gameChangedData.matchResult);
      }
    }
  }, [gameChangedData, update, setBoartInternalState]);

  useEffect(() => {
    if (markTileData) {
      if (markTileData.matchResult === MatchResult.NotMatched) {
        setBoartInternalState({
          isBoardDisabled: true,
          notMatchedTileId: markTileData.notMatchedTileId,
          matchResult: markTileData.matchResult,
        });

        setTimeout(() => {
          update(markTileData.gameData, markTileData.matchResult);
        }, 3000);
      } else {
        update(markTileData.gameData, markTileData.matchResult);
      }
    }
  }, [markTileData, setBoartInternalState, update]);

  return {
    markTile,
  };
};
