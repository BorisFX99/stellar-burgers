import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TBurgerIngredientsTypes
} from '@utils-types';
import { SELECTED_INGREDIENTS_SLICE_NAME } from '../sliceNames';


export type TselectedIngredients = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TselectedIngredients = {
  bun: null,
  ingredients: []
};

export const constructorIngredientSlice = createSlice({
  name: SELECTED_INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === TBurgerIngredientsTypes.BUNS) {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },

    deleteIngredient: (state, action: PayloadAction<string>) => {
      const searchId = action.payload;
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id != searchId
      );
    },

    moveDownIngredient: (state, action: PayloadAction<string>) => {
      const searchId = action.payload;
      const currentIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === searchId
      );
      if (currentIndex < state.ingredients.length - 1) {
        const movedIngredient = state.ingredients.splice(currentIndex, 1)[0];
        state.ingredients.splice(currentIndex + 1, 0, movedIngredient);
      }
    },
    moveUpIngredient: (state, action: PayloadAction<string>) => {
      const searchId = action.payload;
      const currentIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === searchId
      );
      if (currentIndex > 0) {
        const movedIngredient = state.ingredients.splice(currentIndex, 1)[0];
        state.ingredients.splice(currentIndex - 1, 0, movedIngredient);
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectSelectedIngredients: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    })
  }
});

export default constructorIngredientSlice;
