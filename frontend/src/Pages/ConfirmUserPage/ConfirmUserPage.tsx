import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { rem } from 'polished';
import styled from 'styled-components';

import { routes } from 'src/constants/routes';
import { BasicLayout } from 'src/components/Elements/BasicLayout/BasicLayout';
import { ButtonElement } from 'src/components/Elements/ButtonElement/ButtonElement';
import { LoaderElement } from 'src/components/Elements/LoaderElement/LoaderElement';

const CONFIRM_USER = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token) {
      nick
    }
  }
`;

const Title = styled.h2`
  font-size: ${rem(30)};
  text-align: center;
  margin-bottom: ${rem(30)};
`;

export const ConfirmUserPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const history = useHistory();
  const [confirmUser] = useMutation(CONFIRM_USER);

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get('token');

  useEffect(() => {
    const confirm = async () => {
      if (!token) {
        return history.push(routes.homePage);
      }

      try {
        await confirmUser({ variables: { token } });
        setIsLoading(false);
      } catch (err) {
        history.push(routes.homePage);
      }
    };

    confirm();
  }, [token, confirmUser, history]);

  return (
    <BasicLayout areChildrenCentered>
      {isLoading ? (
        <LoaderElement isVisible />
      ) : (
        <div>
          <Title>Yeah! Confirmed :)</Title>
          <ButtonElement
            onClick={() => history.push(routes.homePage)}
            btnWidth={rem(300)}
          >
            Back to login and play!
          </ButtonElement>
        </div>
      )}
    </BasicLayout>
  );
};
