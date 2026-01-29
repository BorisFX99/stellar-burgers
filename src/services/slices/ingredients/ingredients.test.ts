import { initialState } from './ingredientsSlice';
import { ingredientsSlice } from '@slices';
import { ingredientsActions } from '@slice/ingredients';
import { ingredientsMock, ingredientsRejectMock } from '@mocks';
import { TrequestStatus } from '@utils-types';

const { fetchIngredients } = ingredientsActions;

describe('ingredientsSlice reducer ', () => {
  // Проверка запроса всех ингредиентов
  describe('fetchIngredients', () => {
    it('fetchIngredients fullfiled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: ingredientsMock.data
      };
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        ingredients: ingredientsMock.data,
        requestStatus: TrequestStatus.SUCCESS
      });

      expect(state.requestStatus).toBe(TrequestStatus.SUCCESS);
    });

    it('fetchIngredients pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        requestStatus: TrequestStatus.LOADING
      });
    });

    it('fetchIngredients rejected', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: ingredientsRejectMock
      };
      const state = ingredientsSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        requestStatus: TrequestStatus.ERROR,
        error: ingredientsRejectMock.message
      });
    });
  });
});
