import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { styles } from 'src/styles';

const LinkStyled = styled(Link)`
  color: ${styles.colors.black};

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export const LinkElement = ({ children, path }) => {
  return <LinkStyled to={path}>{children}</LinkStyled>;
};
