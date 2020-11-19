import React from 'react';

import { BasicLayout } from 'src/components/Elements/BasicLayout/BasicLayout';
import { LoaderElement } from 'src/components/Elements/LoaderElement/LoaderElement';

export const ConfirmUserPage = () => {
  return (
    <BasicLayout areChildrenCentered>
      <LoaderElement isVisible />
    </BasicLayout>
  );
};
