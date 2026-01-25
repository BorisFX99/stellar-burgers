import { createAppAsyncThunk } from '@store-hooks';
import { INGREDIENTS_SLICE_NAME } from '../slices/sliceNames';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAppAsyncThunk<TIngredient[]>(
  `${INGREDIENTS_SLICE_NAME}/fetchIngredients`,
  async (_, { extra: api }) => {
    const data = await api.getIngredientsApi();
    return data;
  }
);
