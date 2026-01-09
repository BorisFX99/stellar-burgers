import ingredientsSlice from './ingredientsSlice';
import { fetchIngredients } from '@thunks';

export const ingredientsActions = {
  ...ingredientsSlice.actions,
  fetchIngredients
};
export const ingredientsSelectors = ingredientsSlice.selectors;

export { ingredientsSlice };
