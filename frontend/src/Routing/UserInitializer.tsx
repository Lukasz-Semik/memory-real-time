import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import { isEmpty } from 'lodash';

import { MAIN_STORAGE_KEY } from 'src/constants/misc';
import { routes } from 'src/constants/routes';

import { getFromLocalStorage } from '../helpers/localStorage';
import { getIsOnPage } from '../helpers/utils';
import { useGetCurrentUser } from '../store/users/selectors';
import { setCurrentUser } from '../store/users/usersSlice';

const FETCH_USER = gql`
  query FetchUser {
    me {
      id
      nick
      email
    }
  }
`;

interface RenderProps {
  isInitalized: boolean;
}

export const UserInitializer = ({
  children,
}: WithRenderChildrenProps<RenderProps>) => {
  const [isInitalized, setIsInitialized] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const cachedToken = getFromLocalStorage<string>(MAIN_STORAGE_KEY);

  const currentUser = useGetCurrentUser();
  const [fetchUser, { data }] = useLazyQuery(FETCH_USER);
  const fetchedUser = data?.me;

  const isOnDashboardPage = useMemo(
    () => getIsOnPage(location.pathname, routes.dashboardPage),
    [location]
  );

  useEffect(() => {
    if (isInitalized) {
      return;
    }

    if (isOnDashboardPage) {
      if (!cachedToken) {
        setIsInitialized(true);
        return history.push(routes.homePage);
      }

      if (isEmpty(currentUser)) {
        return fetchUser();
      }

      return setIsInitialized(true);
    }

    if (!isEmpty(currentUser)) {
      setIsInitialized(true);
      return history.push(routes.dashboardPage);
    }

    if (cachedToken) {
      return fetchUser();
    }

    setIsInitialized(true);
  }, [
    isOnDashboardPage,
    cachedToken,
    currentUser,
    fetchUser,
    history,
    isInitalized,
  ]);

  useEffect(() => {
    if (!isEmpty(fetchedUser)) {
      dispatch(setCurrentUser(fetchedUser));
      setIsInitialized(true);
      history.push(routes.dashboardPage);
    }
  }, [fetchedUser, dispatch, history]);

  return (
    <>
      {children({
        isInitalized,
      })}
    </>
  );
};
