import { v4 as uuid } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const UPDATE_CART = 'UPDATE_CART'
export const DROP_CART = 'DROP_CART'

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    ingredient: {...ingredient, uuid:uuid()}
})