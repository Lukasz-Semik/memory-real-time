import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-left: ${rem(300)};
`;

const Title = styled.h2`
  padding: ${rem(20)};
`;

interface Props {
  title?: string;
}

export const DashboardPageLayout = ({
  title,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {children}
    </Wrapper>
  );
};
