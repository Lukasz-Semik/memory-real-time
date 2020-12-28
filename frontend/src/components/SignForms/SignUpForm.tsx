import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { rem } from 'polished';

import { routes } from 'src/constants/routes';

import { ButtonElement } from '../Elements/ButtonElement/ButtonElement';
import { InputElement } from '../Elements/InputElement/InputElement';
import { LinkElement } from '../Elements/LinkElement/LinkElement';
import { SIGN_UP } from './gql';
import { ButtonWrapper, FormStyled, InputWrapper, LinkWrapper } from './styled';

export const SignUpForm = () => {
  const [signUp] = useMutation(SIGN_UP);
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async data => {
    try {
      const response = await signUp({
        variables: {
          email: data.email,
          password: data.password,
          nick: data.nick,
        },
      });

      if (response.data?.createUser?.nick) {
        history.push(routes.homePage());
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
          name="nick"
          labelText="Nick"
          placeholder="Your in game nick"
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
        <ButtonElement btnWidth={rem(200)}>Sign Up</ButtonElement>
      </ButtonWrapper>

      <LinkWrapper>
        <LinkElement path={routes.homePage()}>Back to Sign In page</LinkElement>
      </LinkWrapper>
    </FormStyled>
  );
};
