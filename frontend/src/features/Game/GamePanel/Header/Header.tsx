import React, { useContext } from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

import { styles } from 'src/styles';
import { LoaderElement } from 'src/components/Elements/LoaderElement/LoaderElement';

import { GameContext } from '../../GameContext/GameContext';
import { usePlayers } from '../usePlayers';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${rem(80)};
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
  ${styles.helpers.orangeGradient};
  font-weight: 700;
`;

const CurrentUserPlayer = styled.div`
  display: flex;
  align-items: center;
  color: ${styles.colors.mainMint};
  font-size: ${rem(35)};
  padding: 0 ${rem(20)};
`;

const ContentItemWrapper = styled.span`
  margin-right: ${rem(10)};
`;

const SmallText = styled.div`
  font-size: ${rem(16)};
  color: ${styles.colors.black};
`;

const CenteredText = styled.div`
  text-align: center;
`;

const RoundDisplay = styled(CenteredText)`
  font-size: ${rem(20)};
  margin-bottom: ${rem(5)};
`;

const SecondPlayer = styled(CurrentUserPlayer)`
  color: ${styles.colors.mainRed};
`;

export const Header = () => {
  const { gameState } = useContext(GameContext);
  const { currentUserPlayer, secondPlayer, currentPlayerNick } = usePlayers();

  return (
    <Wrapper>
      <CurrentUserPlayer>
        <ContentItemWrapper>
          {currentUserPlayer.nick}: {currentUserPlayer.score}
        </ContentItemWrapper>

        {currentUserPlayer.isPlaying ? (
          <SmallText>Your turn</SmallText>
        ) : (
          <LoaderElement isVisible size={30} />
        )}
      </CurrentUserPlayer>

      <div>
        <RoundDisplay>{`Round: ${gameState.roundCount}`}</RoundDisplay>
        <CenteredText>{`${currentPlayerNick}'s turn`}</CenteredText>
      </div>

      <SecondPlayer>
        {secondPlayer.isPlaying && (
          <ContentItemWrapper>
            <SmallText>Playing</SmallText>
          </ContentItemWrapper>
        )}
        {secondPlayer.nick}: {secondPlayer.score}
      </SecondPlayer>
    </Wrapper>
  );
};
