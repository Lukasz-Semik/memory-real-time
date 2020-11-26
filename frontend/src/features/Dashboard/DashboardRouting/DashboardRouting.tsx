import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GamePage } from 'src/Pages/GamePage/GamePage';

import { routes } from 'src/constants/routes';
import { Friends } from 'src/features/Friends/Friends';
import { GameContextProvider } from 'src/features/Game/GameContext/GameContext';

import { Dashboard } from '../Dashboard';
import { NotificationsContextProvider } from '../Notifications/Notifications';

export const DashboardRouting = () => {
  return (
    <Switch>
      <GameContextProvider>
        <Route path={routes.game()}>
          <GamePage />
        </Route>

        <NotificationsContextProvider>
          <Route path={routes.friends()}>
            <Friends />
          </Route>

          <Route exact path={routes.dashboardPage()}>
            <Dashboard />
          </Route>
        </NotificationsContextProvider>
      </GameContextProvider>
    </Switch>
  );
};
