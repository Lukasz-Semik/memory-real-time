import { useSelector } from 'react-redux';

import { AppState } from '../rootReducer';

export const getUsersSlice = (state: AppState) => state.users;

export const getCurrentUser = (state: AppState) =>
  getUsersSlice(state).currentUser;
export const useGetCurrentUser = () => useSelector(getCurrentUser);
