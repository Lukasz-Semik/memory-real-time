import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { rem } from 'polished';

import { setToLocalStorage } from 'src/helpers/localStorage';
import { MAIN_STORAGE_KEY } from 'src/constants/misc';
import { routes } from 'src/constants/routes';

import { ButtonElement } from '../Elements/ButtonElement/ButtonElement';
import { InputElement } from '../Elements/InputElement/InputElement';
import { LinkElement } from '../Elements/LinkElement/LinkElement';
import { LOGIN } from './gql';
import { ButtonWrapper, FormStyled, InputWrapper, LinkWrapper } from './styled';

export const SignInForm = () => {
  const [login] = useMutation(LOGIN);
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async data => {
    try {
      const response = await login({
        variables: { email: data.email, password: data.password },
      });

      const token = response.data?.login?.accessToken;

      if (response.data?.login?.accessToken) {
        setToLocalStorage(MAIN_STORAGE_KEY, token);
        history.push(routes.dashboardPage());
      }
    } catch (err) {
      // TODO: later
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <InputElement
          name="email"
          labelText="E-mail"
          placeholder="Your e-mail"
          ref={register}
        />
      </InputWrapper>

      <InputWrapper>
        <InputElement
          labelText="Password"
          name="password"
          type="password"
          placeholder="Your password"
          ref={register}
        />
      </InputWrapper>

      <ButtonWrapper>
        <ButtonElement btnWidth={rem(200)}>Sign In</ButtonElement>
      </ButtonWrapper>

      <LinkWrapper>
        <LinkElement path={routes.signUpPage()}>Sign Up</LinkElement>
      </LinkWrapper>
    </FormStyled>
  );
};
