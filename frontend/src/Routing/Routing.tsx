import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignUpPage } from 'src/Pages/SignUpPage/SignUpPage';

import { routes } from 'src/constants/routes';
import { LoaderFullScreenElement } from 'src/components/Elements/LoaderFullScreenElement/LoaderFullScreenElement';

import { ConfirmUserPage } from '../Pages/ConfirmUserPage/ConfirmUserPage';
import { DashboardPage } from '../Pages/DashboardPage/DashboardPage';
import { HomePage } from '../Pages/HomePage/HomePage';
import { UserInitializer } from './UserInitializer';



export const Routing = () => {
  return (
    <BrowserRouter>
      <UserInitializer>
        {({ isInitialized }) =>
          isInitialized ? (
            <Switch>
              <Route path={routes.dashboardPage()}>
                <DashboardPage />
              </Route>

              <Route path={routes.signUpPage()}>
                <SignUpPage />
              </Route>

              <Route path={routes.confirmUserPage()}>
                <ConfirmUserPage />
              </Route>

              <Route path={routes.homePage()}>
                <HomePage />
              </Route>
            </Switch>
          ) : (
            <LoaderFullScreenElement />
          )
        }
      </UserInitializer>
    </BrowserRouter>
  );
};
