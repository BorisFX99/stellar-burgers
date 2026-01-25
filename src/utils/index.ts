import {
  TBurgerIngredients,
  TIngredient,
  TBurgerIngredientsTypes,
  TFormInputErrMsg,
  REGEX,
  ErrorMessages,
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

// Группируем ингридиенты по видам Булки | Начинки | Соусы
// Добавляем им уникальные id
export const groupIngredientsByTypes = (
  ingredients: TIngredient[]
): TBurgerIngredients => {
  const burgerIngredients: TBurgerIngredients = {
    buns: [],
    mains: [],
    sauces: []
  };
  ingredients.forEach((ingredient) => {
    if (ingredient.type === TBurgerIngredientsTypes.BUNS)
      burgerIngredients.buns.push(ingredient);
    else if (ingredient.type === TBurgerIngredientsTypes.MAINS)
      burgerIngredients.mains.push(ingredient);
    else if (ingredient.type === TBurgerIngredientsTypes.SAUCES)
      burgerIngredients.sauces.push(ingredient);
  });

  return burgerIngredients;
};

// Простая валидация для полей email | password | userName
// вывод соответствующих ошибок для форм Логина и Регистрации

type TEasyValidInputsParams = {
  password: string;
  email: string;
  userName?: string;
};
type TValidationResult = {
  isPasswordValid: boolean;
  isEmailValid: boolean;
  isUserNameValid?: boolean;
  inputEmailMsg: Pick<TFormInputErrMsg, 'emailError'>;
  inputErrorsMsg?: TFormInputErrMsg;
};
export type TEasyValidInputsFunc = (
  value: TEasyValidInputsParams
) => TValidationResult;

export const easyValidInputs: TEasyValidInputsFunc = ({
  password,
  email,
  userName
}: TEasyValidInputsParams): TValidationResult => {
  const emailRegex = REGEX.EMAIL;
  const isPasswordValid = password.length >= 6;
  const isEmailValid = emailRegex.test(email);
  const inputErrorsMsg: TFormInputErrMsg = {
    emailError: ErrorMessages.EMAIL_ERROR,
    userNameError: ErrorMessages.USER_NAME_ERROR
  };
  const inputEmailMsg: Pick<TFormInputErrMsg, 'emailError'> = {
    emailError: ErrorMessages.EMAIL_ERROR
  };
  // возвращаем для формы Логина
  const result: TValidationResult = {
    isPasswordValid,
    isEmailValid,
    inputEmailMsg
  };
  // добавляем поля для формы Регистрации
  if (userName !== undefined) {
    result.isUserNameValid = userName.length >= 2;
    result.inputErrorsMsg = inputErrorsMsg;
  }
  return result;
};

type ingridients = {
  bun: TIngredient;
  ingredients: TIngredient[];
};

// Функция возвращает массив id ингридиенров для заказа
export const createOrderRequestBody = (value: ingridients): string[] => {
  const prev = value.ingredients.map((ingr) => ingr._id);
  return [value.bun._id, ...prev, value.bun._id];
};
