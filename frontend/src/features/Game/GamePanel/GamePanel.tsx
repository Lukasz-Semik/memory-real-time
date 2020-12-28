import React, { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';

import { LoaderFullScreenElement } from 'src/components/Elements/LoaderFullScreenElement/LoaderFullScreenElement';

import { GameContext } from '../GameContext/GameContext';
import { Header } from './Header/Header';

const GET_GAME_DATA = gql`
  query getGame($gameId: String!) {
    getGame(gameId: $gameId) {
      id
      currentPlayer
      roundCount
      tiles {
        markedBy
        id
        name
      }
      score {
        creator
        oponent
      }
      oponent {
        id
        nick
        email
      }
      creator {
        id
        nick
        email
      }
    }
  }
`;

export const GamePanel = () => {
  const match = useRouteMatch<{ gameId: string }>();

  const { gameState, setGameState } = useContext(GameContext);

  const [fetch, { data, loading }] = useLazyQuery(GET_GAME_DATA, {
    variables: { gameId: match.params.gameId },
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (data) {
      setGameState(data.getGame);
    }
  }, [data, setGameState]);

  return loading ? (
    <LoaderFullScreenElement />
  ) : (
    <div>{gameState && <Header gameState={gameState} />}</div>
  );
};
