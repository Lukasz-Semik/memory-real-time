import React from 'react';
import styled from 'styled-components';

import { styles } from 'src/styles';
import { LoaderElement } from 'src/components/Elements/LoaderElement/LoaderElement';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const GameStarterLoader = () => {
  return (
    <LoaderWrapper>
      <LoaderElement size={50} isVisible color={styles.colors.mainOrange} />
    </LoaderWrapper>
  );
};
