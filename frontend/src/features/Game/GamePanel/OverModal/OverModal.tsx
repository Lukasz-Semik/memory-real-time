import React from 'react';
import { useHistory } from 'react-router-dom';
import { rem } from 'polished';
import styled from 'styled-components';

import { routes } from 'src/constants/routes';
import { ButtonElement } from 'src/components/Elements/ButtonElement/ButtonElement';
import { ModalElement } from 'src/components/Elements/ModalElement/ModalElement';

import { usePlayers } from '../usePlayers';

const Text = styled.h1`
  text-align: center;
`;

export const OverModal = () => {
  const { currentUserPlayer, secondPlayer } = usePlayers();
  const history = useHistory();

  const getSummaryText = () => {
    if (currentUserPlayer.score === secondPlayer.score) {
      return "It's a draw!";
    }

    if (currentUserPlayer.score > secondPlayer.score) {
      return 'You won!';
    }

    return `${secondPlayer.nick} won!`;
  };

  return (
    <ModalElement isCancelButtonHidden isOpen close={() => {}}>
      <Text as="h2">Game Over</Text>

      <Text>{getSummaryText()}</Text>

      <ButtonElement
        btnWidth={rem(250)}
        onClick={() => history.push(routes.dashboardPage())}
      >
        Back to dashboard
      </ButtonElement>
    </ModalElement>
  );
};
