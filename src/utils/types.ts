import { Dispatch, Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  TCartActions,
  TIngredientsActions,
  TTabActions,
  TForgotPasswordActions,
  TGetOrderActions,
  TAuthActions,
  TWSActions
} from '../services/actions';
import store from '../services/store';

export interface IngredientShape {
  "_id": string,
  "name": string,
  "type": string,
  "proteins": number,
  "fat": number,
  "carbohydrates": number,
  "calories": number,
  "price": number,
  "image": string,
  "image_mobile": string,
  "image_large": string,
  "__v": number
}

export type BunType = "top" | "bottom";

export type TabType = 'Булки' | 'Соусы' | 'Начинки';
export interface CartIngredient extends IngredientShape {
  uuid: string;
}
export interface ICartState {
  readonly buns: ReadonlyArray<CartIngredient>,
  readonly middle: ReadonlyArray<CartIngredient>,
}

export interface IIngredientState {
  readonly ingredients: null | undefined | ReadonlyArray<IngredientShape>,
  readonly ingredientsRequest: boolean,
  readonly ingredientsFailed: boolean,
}

export interface ITabState {
  readonly currentTab: TabType,
  readonly isClick: boolean,
}

export interface IForgotPasswordState {
  message: string,
  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,
  updatePasswordRequest: boolean,
  updatePasswordFailed: boolean,
}

export interface IOrderState {
  orderNumber: null | number,
  orderRequest: boolean,
  orderFailed: boolean,
}

export interface IAuthState {
  isAuth: boolean,
  email: string,
  name: string,
  registerRequest: boolean,
  registerFailed: boolean,
  loginRequest: boolean,
  loginFailed: boolean,
  logoutRequest: boolean,
  logoutFailed: boolean,
  getUserRequest: boolean,
  getUserFailed: boolean,
  setUserRequest: boolean,
  setUserFailed: boolean,
}

export interface IWSState {
  wsConnected: boolean;
  messages: TMessage[];
  error?: Event;
}

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TCartActions
  | TIngredientsActions
  | TTabActions
  | TForgotPasswordActions
  | TGetOrderActions
  | TAuthActions
  | TWSActions;

export type AppDispatch = Dispatch<TApplicationActions>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>
export interface authResponse {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  user: {
    email: string,
    name: string
  }
}
export type TMessage = string;

export interface IOrder  {
  ingredients: string[]
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}
