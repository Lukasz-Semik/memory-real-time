import React from 'react';
import styled from 'styled-components';

import { styles } from 'src/styles';

import { LoaderElement } from '../LoaderElement/LoaderElement';
import { LoaderPortal } from './LoaderPortal';

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${styles.helpers.orangeGradient};
`;

export const LoaderFullScreenElement = () => {
  return (
    <LoaderPortal>
      <LoaderWrapper>
        <LoaderElement isVisible />
      </LoaderWrapper>
    </LoaderPortal>
  );
};
