import React from 'react';

import { BasicLayout } from 'src/components/Elements/BasicLayout/BasicLayout';
import { SignInForm } from 'src/components/SignForms/SignInForm';

export const HomePage = () => {
  return (
    <BasicLayout title="Sign In" areChildrenCentered>
      <SignInForm />
    </BasicLayout>
  );
};
