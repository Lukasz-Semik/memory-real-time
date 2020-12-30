import { useContext } from 'react';
import { Player } from 'global-types';

import { useGetCurrentUser } from 'src/store/users/selectors';

import { GameContext } from '../GameContext/GameContext';

export const usePlayers = () => {
  const { gameState } = useContext(GameContext);
  const currentUser = useGetCurrentUser();

  const currentPlayerType =
    gameState.creator.id === currentUser.id ? Player.Creator : Player.Oponent;

  const secondPlayerType =
    currentPlayerType === Player.Creator ? Player.Oponent : Player.Creator;

  return {
    currentPlayer: {
      id: gameState[currentPlayerType].id,
      nick: gameState[currentPlayerType].nick,
      score: gameState.score[currentPlayerType],
    },
    secondPlayer: {
      id: gameState[secondPlayerType].id,
      nick: gameState[secondPlayerType].nick,
      score: gameState.score[secondPlayerType],
    },
  };
};
