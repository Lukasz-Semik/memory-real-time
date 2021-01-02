import React, { useContext } from 'react';
import { rem } from 'polished';
import styled, { css } from 'styled-components';

import { styles } from 'src/styles';

import { GameContext } from '../../GameContext/GameContext';
import { OverModal } from '../OverModal/OverModal';
import { usePlayers } from '../usePlayers';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: ${rem(460)};
`;

const Button = styled.button<{ isMarked: boolean; borderColor: string }>`
  box-sizing: border-box;
  position: relative;
  width: ${rem(100)};
  height: ${rem(100)};
  margin-bottom: ${rem(20)};
  background-color: brown;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  border: 5px solid brown;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:disabled {
    cursor: not-allowed;
  }

  ${({ isMarked, borderColor }) =>
    isMarked &&
    css`
      background-color: transparent;
      border-color: ${borderColor};
    `};
`;

const Content = styled.p<{ isVisible: boolean }>`
  color: ${styles.colors.black};
  font-weight: 700;
  transition: opacity 0.3s ease;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const TileNameDevInd = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #999;
`;

export const Board = () => {
  const { gameState, markTile, boardInternalState } = useContext(GameContext);
  const { currentUserPlayer } = usePlayers();
  const { isBoardDisabled, notMatchedTileId } = boardInternalState;

  return (
    <>
      <Wrapper>
        <ButtonsWrapper>
          {gameState.tiles.map(tile => {
            const isTileNotMatched = notMatchedTileId === tile.id;
            const isTileMarked = Boolean(tile.markedBy || isTileNotMatched);
            const isTileDisabled = isBoardDisabled || isTileMarked;

            const getBorderColor = () => {
              if (isTileNotMatched) {
                return currentUserPlayer.isPlaying
                  ? styles.colors.mainMint
                  : styles.colors.mainRed;
              }

              return currentUserPlayer.role === tile.markedBy
                ? styles.colors.mainMint
                : styles.colors.mainRed;
            };

            return (
              <Button
                isMarked={isTileMarked}
                borderColor={getBorderColor()}
                key={tile.id}
                disabled={!currentUserPlayer.isPlaying || isTileDisabled}
                onClick={() => markTile(tile.id)}
              >
                <TileNameDevInd>{tile.name}</TileNameDevInd>
                <Content isVisible={isTileMarked}>{tile.name}</Content>
              </Button>
            );
          })}
        </ButtonsWrapper>
      </Wrapper>

      {gameState.isGameOver && <OverModal />}
    </>
  );
};
