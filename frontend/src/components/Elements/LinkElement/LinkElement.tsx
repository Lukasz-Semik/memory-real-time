import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from 'src/styles';
import styled from 'styled-components';

const LinkStyled = styled(Link)`
  color: ${styles.colors.white};

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export const LinkElement = ({ children, path }) => {
  return <LinkStyled to={path}>{children}</LinkStyled>;
};
