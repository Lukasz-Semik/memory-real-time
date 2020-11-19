import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import { isEmpty } from 'lodash';

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

export const UserInitializer = () => {
  const [shouldVerify, setShouldVerify] = useState(false);
  const cachedToken = getFromLocalStorage<string>('battleships_token');
  const history = useHistory();
  const location = useLocation();
  const currentUser = useGetCurrentUser();
  const dispatch = useDispatch();
  const isOnLandingPage = getIsOnPage(location.pathname, routes.homePage);
  const isOnSignUpPage = getIsOnPage(location.pathname, routes.signUpPage);
  const [fetchUser, { loading, data }] = useLazyQuery(FETCH_USER);
  const fetchedUser = data?.me;

  useEffect(() => {
    if (isEmpty(currentUser)) {
      if (!cachedToken && !isOnSignUpPage) {
        history.push(routes.homePage);
      } else {
        fetchUser();
        setShouldVerify(true);
      }
    }
  }, [currentUser, cachedToken, history, fetchUser, isOnSignUpPage]);

  useEffect(() => {
    if (shouldVerify && !loading) {
      if (fetchedUser) {
        dispatch(setCurrentUser(fetchedUser));

        if (isOnLandingPage) {
          history.push(routes.dashboardPage);
        }
      } else if (!isOnLandingPage && !isOnSignUpPage) {
        history.push(routes.homePage);
      }
    }
  }, [
    shouldVerify,
    loading,
    history,
    isOnLandingPage,
    isOnSignUpPage,
    dispatch,
    fetchedUser,
  ]);

  return null;
};
