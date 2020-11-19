import React from 'react';
import { darken, rem } from 'polished';
import styled from 'styled-components';

import { styles } from 'src/styles';

const Button = styled.button<{ btnWidth: string }>`
  background-color: ${styles.colors.mainMint};
  height: ${rem(40)};
  border-radius: ${rem(20)};
  width: ${({ btnWidth }) => btnWidth};
  color: ${styles.colors.white};
  font-size: ${rem(20)};
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.25);
  transition: background-color 0.5s ease;

  &:hover,
  &:focus {
    background-color: ${darken('0.1', styles.colors.mainMint)};
  }
`;

interface Props {
  btnWidth?: string;
  onClick?: () => void;
}

export const ButtonElement = ({
  children,
  btnWidth,
  onClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <Button onClick={onClick} btnWidth={btnWidth}>
      {children}
    </Button>
  );
};
