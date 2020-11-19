import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignUpPage } from 'src/Pages/SignUpPage/SignUpPage';
import styled from 'styled-components';

import { routes } from 'src/constants/routes';
import { LoaderElement } from 'src/components/Elements/LoaderElement/LoaderElement';

import { ConfirmUserPage } from '../Pages/ConfirmUserPage/ConfirmUserPage';
import { DashboardPage } from '../Pages/DashboardPage/DashboardPage';
import { HomePage } from '../Pages/HomePage/HomePage';
import { UserInitializer } from './UserInitializer';

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Routing = () => {
  return (
    <BrowserRouter>
      <UserInitializer>
        {({ isInitialized }) =>
          isInitialized ? (
            <Switch>
              <Route path={routes.dashboardPage}>
                <DashboardPage />
              </Route>

              <Route path={routes.signUpPage}>
                <SignUpPage />
              </Route>

              <Route path={routes.confirmUserPage}>
                <ConfirmUserPage />
              </Route>

              <Route path={routes.homePage}>
                <HomePage />
              </Route>
            </Switch>
          ) : (
            <LoaderWrapper>
              <LoaderElement isVisible />
            </LoaderWrapper>
          )
        }
      </UserInitializer>
    </BrowserRouter>
  );
};
