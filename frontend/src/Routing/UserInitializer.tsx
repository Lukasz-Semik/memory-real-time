import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { isEmpty } from 'lodash';

import { MAIN_STORAGE_KEY } from 'src/constants/misc';
import { routes } from 'src/constants/routes';
import { notifyError } from 'src/components/Elements/ToastElement';

import { getFromLocalStorage } from '../helpers/localStorage';
import { getIsOnPage } from '../helpers/utils';
import { useGetCurrentUser } from '../store/users/selectors';
import { setCurrentUser } from '../store/users/usersSlice';
import { FETCH_USER } from './gql';

interface RenderProps {
  isInitialized: boolean;
}

export const UserInitializer = ({
  children,
}: WithRenderChildrenProps<RenderProps>) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const cachedToken = getFromLocalStorage<string>(MAIN_STORAGE_KEY);

  const currentUser = useGetCurrentUser();
  const [fetchUser, { data, error }] = useLazyQuery(FETCH_USER);
  const fetchedUser = data?.me;

  const isOnDashboardPage = useMemo(
    () => getIsOnPage(location.pathname, routes.dashboardPage()),
    [location]
  );

  const fetch = useCallback(async () => {
    try {
      await fetchUser();
    } catch (err) {
      notifyError();
    }
  }, [fetchUser]);

  useEffect(() => {
    const initialize = () => {
      if (isOnDashboardPage) {
        if (!cachedToken) {
          setIsInitialized(true);
          return history.push(routes.homePage());
        }

        if (isEmpty(currentUser)) {
          return fetch();
        }

        return setIsInitialized(true);
      }

      if (!isEmpty(currentUser) && !isOnDashboardPage) {
        setIsInitialized(true);
        return history.push(routes.dashboardPage());
      }

      if (cachedToken) {
        return fetch();
      }

      setIsInitialized(true);
    };

    initialize();
  }, [
    isOnDashboardPage,
    cachedToken,
    currentUser,
    fetch,
    history,
    isInitialized,
  ]);

  useEffect(() => {
    if (!isEmpty(fetchedUser)) {
      dispatch(setCurrentUser(fetchedUser));
      setIsInitialized(true);

      if (!isOnDashboardPage) {
        history.push(routes.dashboardPage());
      }
    }
  }, [fetchedUser, currentUser, dispatch, history, isOnDashboardPage]);

  useEffect(() => {
    if (error?.message === 'Unauthorized') {
      notifyError('Your session is over');
      localStorage.removeItem(MAIN_STORAGE_KEY);
      history.push(routes.homePage());
      setIsInitialized(true);
    }
  }, [error, history]);

  return (
    <>
      {children({
        isInitialized,
      })}
    </>
  );
};
