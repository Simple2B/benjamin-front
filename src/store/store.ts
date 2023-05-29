import { configureStore } from '@reduxjs/toolkit';
import cemeteryReducer from './reducers/cemetery';

export const store = configureStore({
  reducer: {
    cemeteryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
