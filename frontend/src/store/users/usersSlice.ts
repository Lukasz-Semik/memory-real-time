import { createSlice } from '@reduxjs/toolkit';

import { User } from 'src/types/user';

const initialState = {
  currentUser: {} as User,
  accessToken: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const { setCurrentUser, setAccessToken } = usersSlice.actions;
export const { reducer: usersReducer } = usersSlice;
