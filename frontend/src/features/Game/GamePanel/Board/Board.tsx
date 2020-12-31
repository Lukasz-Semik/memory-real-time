import React, { useContext } from 'react';

import { GameContext } from '../../GameContext/GameContext';
import { usePlayers } from '../usePlayers';

export const Board = () => {
  const { gameState, markTile, boardInternalState } = useContext(GameContext);
  const { currentUserPlayer } = usePlayers();
  const { isBoardDisabled, notMatchedTileId } = boardInternalState;

  return (
    <div>
      {gameState.tiles.map(tile => {
        const isTileMarked = Boolean(
          tile.markedBy || notMatchedTileId === tile.id
        );
        const isTileDisabled = isBoardDisabled || isTileMarked;

        return (
          <button
            style={{
              border: '1px solid black',
              backgroundColor: isTileMarked ? 'green' : 'transparent',
            }}
            key={tile.id}
            disabled={!currentUserPlayer.isPlaying || isTileDisabled}
            onClick={() => markTile(tile.id)}
          >
            <div>{tile.name}</div>
            {isTileMarked ? 'visible' : 'invisible'}
          </button>
        );
      })}
    </div>
  );
};
