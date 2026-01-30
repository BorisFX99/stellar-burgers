import { rootReducer } from './store';
import { initialState as constrIngredtsInitState } from '@slice/constructorIngredients/constructorIngredientSlice';
import { initialState as feedsInitState } from '@slice/feeds/feedsSlice';
import { initialState as ingredtsInitState } from '@slice/ingredients/ingredientsSlice';
import { initialState as userInitState } from '@slice/user/userSlice';
import { initialState as userOrdersInitState } from '@slice/userOrders/userOrdersSlice';
import * as sliceNames from './slices/sliceNames';

describe('Проверка инициализации корневого rootReducer', () => {
  it('должен инициализироваться корректно', () => {
    const state = rootReducer(undefined, { type: '' });

    expect(state).toEqual({
      [sliceNames.SELECTED_INGREDIENTS_SLICE_NAME]: constrIngredtsInitState,
      [sliceNames.FEEDS_SLICE_NAME]: feedsInitState,
      [sliceNames.INGREDIENTS_SLICE_NAME]: ingredtsInitState,
      [sliceNames.USER_SLICE_NAME]: userInitState,
      [sliceNames.USER_ORDERS_SLICE_NAME]: userOrdersInitState
    });
  });
});
