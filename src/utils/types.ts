import { Dispatch } from 'redux';
import { TCartActions, TIngredientsActions } from '../services/actions'

type TApplicationActions =
  |TCartActions
  |TIngredientsActions;

export type AppDispatch = Dispatch<TApplicationActions>; 

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
export interface CartType {
  readonly buns: ReadonlyArray<CartIngredient>,
  readonly middle: ReadonlyArray<CartIngredient>, 
}

export interface IngredientState {
  readonly ingredients:  null | undefined | ReadonlyArray<IngredientShape>,
  readonly ingredientsRequest: boolean,
  readonly ingredientsFailed: boolean,
}

export interface RootState {
  ingredients: IngredientState,
}

export interface authResponse {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  user: {
    email: string,
    name: string
  }
} 
