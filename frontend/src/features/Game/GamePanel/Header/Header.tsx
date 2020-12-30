import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

import { styles } from 'src/styles';

import { usePlayers } from '../usePlayers';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${rem(80)};
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
  ${styles.helpers.orangeGradient};
`;

const CurrentPlayer = styled.div`
  color: ${styles.colors.mainMint};
  font-size: ${rem(35)};
  font-weight: 700;
  padding: 0 ${rem(20)};
`;

const SecondPlayer = styled(CurrentPlayer)`
  color: ${styles.colors.mainRed};
`;

export const Header = () => {
  const { currentPlayer, secondPlayer } = usePlayers();

  return (
    <Wrapper>
      <CurrentPlayer>
        {currentPlayer.nick}: {currentPlayer.score}
      </CurrentPlayer>

      <SecondPlayer>
        {secondPlayer.nick}: {secondPlayer.score}
      </SecondPlayer>
    </Wrapper>
  );
};
