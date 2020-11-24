import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from 'src/constants/routes';
import { Friends } from 'src/features/Friends/Friends';
import { InviteFriend } from 'src/features/InviteFriend/InviteFriend';

import { Dashboard } from '../Dashboard';

export const DashboardRouting = () => {
  return (
    <Switch>
      <Route path={routes.inviteFriend()}>
        <InviteFriend />
      </Route>

      <Route path={routes.friends()}>
        <Friends />
      </Route>

      <Route path={routes.dashboardPage()}>
        <Dashboard />
      </Route>
    </Switch>
  );
};
