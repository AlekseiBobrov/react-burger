import { v4 as uuid } from 'uuid';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_CART, DROP_CART } from '../constants'
import { IngredientShape, CartIngredient } from '../../utils/types';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: {
    readonly ingredient: CartIngredient;
  }
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly payload: {
    readonly ingredient: IngredientShape;
    readonly orderIndex: number;
  }
}

export interface IUpdateCartAction {
  readonly type: typeof UPDATE_CART;
  readonly payload: {
    readonly middle: CartIngredient[];
  }
}

export interface IDropCartAction {
  readonly type: typeof DROP_CART;
}

export type TCartActions =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IUpdateCartAction
  | IDropCartAction

export const addIngredient = (ingredient: IngredientShape): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  payload: {
    ingredient: { ...ingredient, uuid: uuid() }
  }
})

export const removeIngredient = (ingredient: IngredientShape, orderIndex: number): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  payload: {
    ingredient: ingredient,
    orderIndex: orderIndex,
  }
})

export const updateCart = (middle: CartIngredient[]): IUpdateCartAction => ({
  type: UPDATE_CART,
  payload:{
    middle
  }
})

export const dropCart = (): IDropCartAction => ({
  type: DROP_CART
})