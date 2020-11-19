import React from 'react';

import { BasicLayout } from 'src/components/Elements/BasicLayout/BasicLayout';
import { SignUpForm } from 'src/components/SignForms/SignUpForm';

export const SignUpPage = () => (
  <BasicLayout title="Sign up">
    <SignUpForm />
  </BasicLayout>
);
