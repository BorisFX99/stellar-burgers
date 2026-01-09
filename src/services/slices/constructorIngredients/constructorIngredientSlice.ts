import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TBurgerIngredientsTypes
} from '@utils-types';
import { SELECTED_INGREDIENTS_SLICE_NAME } from '../sliceNames';
import { v4 as uuidv4 } from 'uuid';

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
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;
      const id = uuidv4();
      const constructorIngredient: TConstructorIngredient = {
        ...ingredient,
        id: id
      };
      if (constructorIngredient.type === TBurgerIngredientsTypes.BUNS) {
        state.bun = constructorIngredient;
      } else {
        state.ingredients.push(constructorIngredient);
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
