import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

import { styles } from 'src/styles';

import { GameState } from '../../types';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${rem(80)};
  background: linear-gradient(
    to top,
    ${styles.colors.mainOrange},
    ${styles.colors.mainYellow}
  );
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
`;

const Creator = styled.div`
  color: ${styles.colors.mainMint};
  font-size: ${rem(35)};
  font-weight: 700;
  padding: 0 ${rem(20)};
`;

const Oponent = styled(Creator)`
  color: ${styles.colors.mainRed};
`;

interface Props {
  gameState: GameState;
}

export const Header = ({ gameState }: Props) => {
  return (
    <Wrapper>
      <Creator>{gameState.creator.nick}: 0</Creator>

      <Oponent>{gameState.oponent.nick}: 0</Oponent>
    </Wrapper>
  );
};
