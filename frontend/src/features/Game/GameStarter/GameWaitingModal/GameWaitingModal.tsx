import React, { useCallback, useContext } from 'react';
import { rem } from 'polished';
import styled, { keyframes } from 'styled-components';

import { styles } from 'src/styles';
import { ModalElement } from 'src/components/Elements/ModalElement/ModalElement';

import { GameContext } from '../../GameContext/GameContext';
import { GameStarterLoader } from '../GameStarterLoader/GameStarterLoader';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${rem(30)};
`;

const Button = styled.button`
  background-color: ${styles.colors.mainRed};
  padding: ${rem(10)} ${rem(30)};
  color: ${styles.colors.white};
  font-size: ${rem(18)};
`;

const CounterWrapper = styled.div`
  width: ${rem(400)};
  margin: 0 auto;
  margin-top: ${rem(20)};
`;

const animateLine = keyframes`
  0%{
    width: ${rem(400)};
  }

  100% {
    width: 0;
  }
`;

const CounterLine = styled.div`
  width: ${rem(400)};
  height: ${rem(10)};
  background-color: ${styles.colors.mainMint};
  animation: ${animateLine} 10s linear forwards;
`;

interface Props {
  invitedFriendNick: string;
  closeModal: () => void;
}

export const GameWaitingModal = ({ invitedFriendNick, closeModal }: Props) => {
  const { cancelGame } = useContext(GameContext);

  const cancelInvitation = useCallback(() => {
    cancelGame();
    closeModal();
  }, [cancelGame, closeModal]);

  return (
    <ModalElement
      minWidth={rem(590)}
      title={`Waiting for ${invitedFriendNick} acceptation`}
      close={closeModal}
      isCancelButtonHidden
      isOpen
    >
      <GameStarterLoader />

      <CounterWrapper>
        <CounterLine onAnimationEnd={cancelInvitation} />
      </CounterWrapper>

      <ButtonWrapper>
        <Button onClick={cancelInvitation}>Cancel</Button>
      </ButtonWrapper>
    </ModalElement>
  );
};
