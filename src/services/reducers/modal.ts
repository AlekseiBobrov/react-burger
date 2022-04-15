import { DISPLAY_INGREDIENT, HIDE_INGREDIENT } from '../actions';
import type { IngredientShape } from '../../utils/types.js'

interface ModalActionType {
  type: string,
  ingredient?: IngredientShape | null
}

const initialState = {
  detailsIngredient: null,
};

export const modalReducer = (state = initialState, action:ModalActionType) => {
  switch (action.type) {
    case DISPLAY_INGREDIENT: {
      return { ...state, detailsIngredient: action.ingredient}
    }
    case HIDE_INGREDIENT: {
      return { ...state, detailsIngredient: null};
    }
    default: {
      return state;
    }
  }
};