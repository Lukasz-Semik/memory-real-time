import React, { forwardRef } from 'react';
import { rem } from 'polished';
import { styles } from 'src/styles';
import styled from 'styled-components';

const Input = styled.input`
  display: block;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid ${styles.colors.black};
  color: ${styles.colors.black};
  font-size: ${rem(20)};
  width: 100%;
  transition: color 0.5s ease, border-color 0.5s ease;
  padding: ${rem(5)} 0;
  outline: none;

  &:hover,
  &:focus {
    color: ${styles.colors.mainMint};
    border-color: ${styles.colors.mainMint};
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
}

export const InputElement = forwardRef<HTMLInputElement, Props>(
  ({ labelText, name, ...rest }: Props, ref) => (
    <label>
      {labelText}

      <Input name={name} id={name} ref={ref} {...rest} />
    </label>
  )
);
