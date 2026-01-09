import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrequestStatus, TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from '../sliceNames';
import { fetchIngredients } from '@thunks';

export interface Iingredients {
  ingredients: TIngredient[];
  requestStatus: TrequestStatus;
}

const initialState: Iingredients = {
  ingredients: [],
  requestStatus: TrequestStatus.IDLE
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
      .addCase(fetchIngredients.rejected, (state) => {
        state.requestStatus = TrequestStatus.ERROR;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.requestStatus = TrequestStatus.SUCCESS;
          state.ingredients = action.payload;
        }
      );
  }
});

export default ingredientsSlice;
