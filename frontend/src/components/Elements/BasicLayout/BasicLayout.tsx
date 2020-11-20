import React from 'react';
import styled, { css } from 'styled-components';

import { styles } from 'src/styles';

const Heading = styled.h1`
  margin: 0;
  text-align: center;
`;

const Wrapper = styled.div<{ areChildrenCentered?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${styles.colors.mainOrange};
  background: linear-gradient(
    to top,
    ${styles.colors.mainOrange},
    ${styles.colors.mainYellow}
  );

  > div {
    width: 100%;
  }

  ${({ areChildrenCentered }) =>
    areChildrenCentered &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `};
`;

interface Props {
  title?: string;
  areChildrenCentered?: boolean;
}

export const BasicLayout = ({
  title,
  areChildrenCentered,
  children,
}: React.PropsWithChildren<Props>) => (
  <Wrapper areChildrenCentered={areChildrenCentered}>
    <div>
      {title && <Heading>{title}</Heading>}
      {children}
    </div>
  </Wrapper>
);
