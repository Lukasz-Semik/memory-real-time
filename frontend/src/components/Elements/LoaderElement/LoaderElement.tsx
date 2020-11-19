import React from 'react';
import Loader from 'react-loader-spinner';

import { styles } from 'src/styles';

interface Props {
  isVisible?: boolean;
  size?: number;
}

export const LoaderElement = ({ isVisible, size }: Props) => {
  return isVisible ? (
    <Loader
      type="Bars"
      color={styles.colors.white}
      height={size || 100}
      width={size || 100}
    />
  ) : null;
};
