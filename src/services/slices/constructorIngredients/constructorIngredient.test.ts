import { initialState } from './constructorIngredientSlice';
import { constructorIngredientSlice } from '@slices';
import { constructorIngredientActions } from '@slice/constructorIngredients';
import {
  mockIngredientBun,
  mockIngredientFill,
  mockFillingIngredients
} from '@mocks';

const {
  addIngredient,
  deleteIngredient,
  moveDownIngredient,
  moveUpIngredient,
  clearConstructor
} = constructorIngredientActions;

describe('constructorIngredientSlice reducer', () => {
  // Проверка инициализации редусера слайса
  it('correctly init', () => {
    const state = constructorIngredientSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
  // Проверка добавления булки
  it('check add Bun ingredient in Burger Constructor', () => {
    const action = addIngredient(mockIngredientBun);
    const state = constructorIngredientSlice.reducer(initialState, action);
    const resultState = { ...initialState, bun: mockIngredientBun };
    expect(state).toEqual(resultState);
    expect(state.bun).toEqual(mockIngredientBun);
    expect(state.ingredients).toEqual([]);
  });
  // Проверка добавления начинки
  it('check add Fillng ingredient in Burger Constructor', () => {
    const action = addIngredient(mockIngredientFill);
    const state = constructorIngredientSlice.reducer(initialState, action);
    const resultState = { ...initialState, ingredients: [mockIngredientFill] };
    expect(state).toEqual(resultState);
    expect(state.ingredients[0]).toEqual(mockIngredientFill);
    expect(state.bun).toBe(null);
  });
  // Проверка удаления ингредиента из конструктора
  it('check delete ingredient in Burger Constructor', () => {
    const startState = {
      ...initialState,
      ingredients: mockFillingIngredients
    };
    const action = deleteIngredient(mockFillingIngredients[0].id);
    const state = constructorIngredientSlice.reducer(startState, action);

    const resultState = {
      bun: null,
      ingredients: mockFillingIngredients.slice(1)
    };

    expect(state).toEqual(resultState);
    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0]._id).toBe('22');
    expect(state.ingredients[1]._id).toBe('33');
    const deletedIngredient = state.ingredients.find(
      (el) => el._id === mockFillingIngredients[0]._id
    );
    expect(deletedIngredient).toBe(undefined);
  });
  // Проверка перемещения винз ингредиента
  it('check moveDownIngredient in Burger Constructor', () => {
    const startState = {
      ...initialState,
      ingredients: mockFillingIngredients
    };
    const action = moveDownIngredient(mockFillingIngredients[1].id);
    const state = constructorIngredientSlice.reducer(startState, action);

    expect(state.bun).toBe(null);
    expect(state.ingredients[0]).toEqual(mockFillingIngredients[0]);
    expect(state.ingredients[1]).toEqual(mockFillingIngredients[2]);
    expect(state.ingredients[2]).toEqual(mockFillingIngredients[1]);
  });
  // Проверка перемещения вверх ингредиента
  it('check moveUPIngredient in Burger Constructor', () => {
    const startState = {
      ...initialState,
      ingredients: mockFillingIngredients
    };
    const action = moveUpIngredient(mockFillingIngredients[1].id);
    const state = constructorIngredientSlice.reducer(startState, action);

    expect(state.bun).toBe(null);
    expect(state.ingredients[0]).toEqual(mockFillingIngredients[1]);
    expect(state.ingredients[1]).toEqual(mockFillingIngredients[0]);
    expect(state.ingredients[2]).toEqual(mockFillingIngredients[2]);
  });

  // Очистка конструктора
  it('check clear Burger Constructor', () => {
    const action = clearConstructor();
    const state = constructorIngredientSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

});
