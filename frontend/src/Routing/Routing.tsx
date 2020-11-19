import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignUpPage } from 'src/Pages/SignUpPage/SignUpPage';

import { routes } from 'src/constants/routes';

import { DashboardPage } from '../Pages/DashboardPage/DashboardPage';
import { HomePage } from '../Pages/HomePage/HomePage';
import { UserInitializer } from './UserInitializer';

export const Routing = () => {
  return (
    <BrowserRouter>
      <UserInitializer />

      <Switch>
        <Route path={routes.dashboardPage}>
          <DashboardPage />
        </Route>

        <Route path={routes.signUpPage}>
          <SignUpPage />
        </Route>

        <Route path={routes.homePage}>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
