import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
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
