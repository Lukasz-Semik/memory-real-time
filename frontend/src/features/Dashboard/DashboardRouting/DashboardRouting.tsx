import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from 'src/constants/routes';
import { Friends } from 'src/features/Friends/Friends';

import { Dashboard } from '../Dashboard';
import { NotificationsContextProvider } from '../Notifications/Notifications';

export const DashboardRouting = () => {
  return (
    <Switch>
      <NotificationsContextProvider>
        <Route path={routes.friends()}>
          <Friends />
        </Route>

        <Route exact path={routes.dashboardPage()}>
          <Dashboard />
        </Route>
      </NotificationsContextProvider>
    </Switch>
  );
};
