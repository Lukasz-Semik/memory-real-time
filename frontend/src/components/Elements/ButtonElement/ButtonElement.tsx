import React from 'react';
import { darken, rem } from 'polished';
import { styles } from 'src/styles';
import styled from 'styled-components';

const Button = styled.button<{ btnWidth: string }>`
  background-color: ${styles.colors.mainMint};
  padding: ${rem(10)} 0;
  width: ${({ btnWidth }) => btnWidth};
  color: ${styles.colors.white};
  font-size: ${rem(20)};
  transition: background-color 0.5s ease;

  &:hover,
  &:focus {
    background-color: ${darken('0.1', styles.colors.mainMint)};
  }
`;

export const ButtonElement = ({ children, btnWidth }) => {
  return <Button btnWidth={btnWidth}>{children}</Button>;
};
