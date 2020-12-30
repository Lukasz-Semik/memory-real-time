import React, { useContext } from 'react';

import { GameContext } from '../../GameContext/GameContext';

export const Board = () => {
  const { gameState, markTile } = useContext(GameContext);

  return (
    <div>
      {gameState.tiles.map(tile => (
        <button
          style={{
            border: '1px solid black',
            backgroundColor: tile.markedBy ? 'green' : 'transparent',
          }}
          key={tile.id}
          onClick={() => markTile(tile.id)}
        >
          <div>{tile.name}</div>
          {tile.markedBy ? 'visible' : 'invisible'}
        </button>
      ))}
    </div>
  );
};
