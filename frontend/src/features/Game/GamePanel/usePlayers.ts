import { useContext } from 'react';
import { PlayerRole } from 'global-types';

import { useGetCurrentUser } from 'src/store/users/selectors';

import { GameContext } from '../GameContext/GameContext';
import { PlayersDisplayData } from '../types';

export const usePlayers = (): PlayersDisplayData => {
  const { gameState } = useContext(GameContext);
  const currentUser = useGetCurrentUser();

  const currentPlayerRole =
    gameState.creator.id === currentUser.id
      ? PlayerRole.Creator
      : PlayerRole.Oponent;

  const secondPlayerRole =
    currentPlayerRole === PlayerRole.Creator
      ? PlayerRole.Oponent
      : PlayerRole.Creator;

  return {
    currentUserPlayer: {
      id: gameState[currentPlayerRole].id,
      nick: gameState[currentPlayerRole].nick,
      score: gameState.score[currentPlayerRole],
      role: currentPlayerRole,
      isPlaying: currentPlayerRole === gameState.currentPlayer,
    },
    secondPlayer: {
      id: gameState[secondPlayerRole].id,
      nick: gameState[secondPlayerRole].nick,
      score: gameState.score[secondPlayerRole],
      role: secondPlayerRole,
      isPlaying: secondPlayerRole === gameState.currentPlayer,
    },
    currentPlayerNick: gameState[gameState.currentPlayer].nick,
  };
};
