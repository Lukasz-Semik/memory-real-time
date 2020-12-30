import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import { last } from 'lodash';

import { useGetCurrentUser } from 'src/store/users/selectors';

import { GameChangedData, GameState } from '../types';
import { GAME_CHANGED_SUBSCRIPTION } from './gql';

export const useOngoingGame = (
  isGameInitialized: boolean,
  setGameState: (gameState: GameState) => void
) => {
  const location = useLocation();
  const currentUser = useGetCurrentUser();

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

  useEffect(() => {
    if (gameData) {
      setGameState(gameData);
    }
  }, [gameData, setGameState]);
};
