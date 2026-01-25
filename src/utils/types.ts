export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TTabMode = 'bun' | 'sauce' | 'main';

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export enum TrequestStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type TBurgerIngredients = {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
};

export enum TBurgerIngredientsTypes {
  BUNS = 'bun',
  MAINS = 'main',
  SAUCES = 'sauce'
}

export enum AppRoutes {
  Constructor = '/',
  Feed = '/feed',
  ForgotPassword = '/forgot-password',
  Login = '/login',
  NotFound = '*',
  Profile = '/profile',
  ProfileOrders = '/profile/orders',
  Register = '/register',
  ResetPassword = '/reset-password',
  IngredientDetails = '/ingredients/:id',
  OrderInfo = '/feed/:number',
  ProfileOrderInfo = '/profile/orders/:number'
}

export enum UserStorageKeys {
  EMAIL = 'email',
  NAME = 'name'
}

export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
} as const;

export enum ErrorMessages {
  FORM_SUBMIT_LOGIN = 'Неверный логин или пароль',
  FORM_SUBMIT_REGISTER = 'Этот логин уже занят, выберите другой 😉',
  EMAIL_ERROR = 'Некорректный Email',
  USER_NAME_ERROR = 'Укажите имя'
}

export type TFormInputErrMsg = {
  emailError: ErrorMessages.EMAIL_ERROR;
  userNameError: ErrorMessages.USER_NAME_ERROR;
};

export type TFormInputErr = {
  emailErr: boolean;
  userNameErr: boolean;
};
