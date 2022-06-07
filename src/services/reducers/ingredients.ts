import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../constants';

import { TIngredientsActions } from '../actions';

import type { IIngredientState } from '../../utils/types.js'

const initialState: IIngredientState = {
  ingredients: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientReducer = (state = initialState, action: TIngredientsActions): IIngredientState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredientsFailed: false, ingredientsRequest: false, ingredients: action.ingredients };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    default: {
      return state;
    }
  }
};