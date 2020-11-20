import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Friends } from 'src/features/Friends/Friends';
import { InviteFriend } from 'src/features/InviteFriend/InviteFriend';

import { routes } from 'src/constants/routes';

export const DashboardRouting = () => {
  return (
    <Switch>
      <Route path={routes.inviteFriend}>
        <InviteFriend />
      </Route>

      <Route path={routes.dashboardPage}>
        <Friends />
      </Route>
    </Switch>
  );
};
