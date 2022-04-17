import type { IngredientShape, IngredientState } from '../../utils/types.js'

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/ingredients';


interface IngredientActionType {
  type: string,
  ingredients?: IngredientShape[]
}

const initialState = {
  ingredients: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientReducer = (state:IngredientState = initialState, action: IngredientActionType):IngredientState => {
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
    case  GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    default: {
      return state;
    }
  }
};