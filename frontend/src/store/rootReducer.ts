import { combineReducers } from 'redux';

import { usersReducer } from './users/usersSlice';

export const rootReducer = combineReducers({
  users: usersReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
