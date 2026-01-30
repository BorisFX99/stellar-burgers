import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrequestStatus, TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from '../sliceNames';
import { fetchIngredients } from '@thunks';

export interface Iingredients {
  ingredients: TIngredient[];
  requestStatus: TrequestStatus;
  error: string | null;
}

export const initialState: Iingredients = {
  ingredients: [],
  requestStatus: TrequestStatus.IDLE,
  error: null
};

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {
    clearIngredients: (state) => {
      (state.ingredients = []), (state.requestStatus = TrequestStatus.IDLE);
    }
  },
  selectors: {
    selectAllIngredients: (state) => state.ingredients,
    selectRequestStatus: (state) => state.requestStatus,
    selectIngredientById: (state, id: string) =>
      state.ingredients.find((ingredient) => ingredient._id === id)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.requestStatus = TrequestStatus.LOADING;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.requestStatus = TrequestStatus.ERROR;
        if (action.error?.message) state.error = action.error?.message;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.requestStatus = TrequestStatus.SUCCESS;
          state.ingredients = action.payload;
          state.error = null;
        }
      );
  }
});

export default ingredientsSlice;
