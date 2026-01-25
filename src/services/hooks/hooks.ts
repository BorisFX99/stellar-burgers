import {
  createAsyncThunk,
  ActionCreator,
  ActionCreatorsMapObject,
  AsyncThunk,
  bindActionCreators
} from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { RootState, AppDispatch } from '../store';
import { Api } from 'src/utils/Api/burger-api';
import { useMemo } from 'react';
// import { store } from '../store';

export const useAppDispatch = dispatchHook.withTypes<AppDispatch>();
export const useAppSelector = selectorHook.withTypes<RootState>();

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: Api;
  rejectWithValue: string;
}>();

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key];
};

// хук возвращает обернутый в dispatch экшен + обрабатывает extraReduers
export const useDispatchedActions = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();
  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );
};

/* Это можно использовать напрямую из стора.
(здесь реализован через ленивый импорт иначе циклическая зависимость из-за createAppAsyncThunk )
*/
export const getDispatchedActions = <Actions extends ActionCreatorsMapObject>(
  actionCreators: Actions
): BoundActions<Actions> => {
  const { store } = require('../store');
  return bindActionCreators(actionCreators, store.dispatch);
};
