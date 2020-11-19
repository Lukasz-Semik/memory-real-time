import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { AppState, rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppThunk = ThunkAction<void, AppState, null, Action<string>>;
