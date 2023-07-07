import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamCoreAPi } from './services/shazamCore';
export const store = configureStore({
  reducer: {
    [shazamCoreAPi.reducerPath]: shazamCoreAPi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreAPi.middleware),
});
