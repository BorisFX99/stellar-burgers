import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  ingredientsSlice,
  constructorIngredientSlice,
  feedsSlice,
  userSlice,
  userOrdersSlice
} from '@slices';

import { api } from '@api';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorIngredientSlice,
  feedsSlice,
  userSlice,
  userOrdersSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } })

  // devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
