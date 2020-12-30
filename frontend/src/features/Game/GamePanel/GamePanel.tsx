import React, { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { LoaderFullScreenElement } from 'src/components/Elements/LoaderFullScreenElement/LoaderFullScreenElement';

import { GameContext } from '../GameContext/GameContext';
import { GameState } from '../types';
import { GET_GAME_DATA } from './gql';
import { Header } from './Header/Header';

export const GamePanel = () => {
  const match = useRouteMatch<{ gameId: string }>();

  const { isGameInitialized, setGameState, initilizeGame } = useContext(
    GameContext
  );

  const [fetch, { data, loading }] = useLazyQuery<{
    getGame: { gameData: GameState };
  }>(GET_GAME_DATA, {
    variables: { gameId: match.params.gameId },
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (data) {
      setGameState(data.getGame.gameData);
      initilizeGame();
    }
  }, [data, setGameState, initilizeGame]);

  return loading ? (
    <LoaderFullScreenElement />
  ) : (
    <div>{isGameInitialized && <Header />}</div>
  );
};
