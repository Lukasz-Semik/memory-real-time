import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { styles } from 'src/styles';

const activeClassName = 'active-link';

const LinkStyled = styled(NavLink)`
  color: ${styles.colors.black};

  &:hover,
  &:focus,
  &.${activeClassName} {
    text-decoration: underline;
  }
`;

export const LinkElement = ({ children, path }) => {
  return (
    <LinkStyled activeClassName={activeClassName} to={path} exact>
      {children}
    </LinkStyled>
  );
};
