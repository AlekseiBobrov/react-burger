import { ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_CART, DROP_CART } from '../actions/cart';
import type { CartType, IngredientShape } from '../../utils/types.js'

interface CartActionType {
  type: string,
  ingredient: IngredientShape,
  orderIndex?: number,
  middle?: string[],
}


const initialState = {
  buns: [],
  middle: [],
};

export const cartReducer = (state: CartType = initialState, action: CartActionType): CartType => {
  switch (action.type) {

    case ADD_INGREDIENT: {
      if (action.ingredient.type === 'bun'){
          return { ...state, buns: [action.ingredient._id, action.ingredient._id]};
      } else {
        let middle = state.middle.slice();
        middle.push(action.ingredient._id)
        return { ...state, middle: middle};
      }
    }

    case REMOVE_INGREDIENT: {
      if (action.ingredient.type === 'bun'){
          return { ...state, buns: []};
      } else {
        console.log('action.orderIndex', action.orderIndex)
        let index = action.orderIndex?action.orderIndex:state.middle.indexOf(action.ingredient._id);
        let middle = state.middle.slice();
        middle.splice(index, 1);
        return { ...state, middle: middle};
      }
    }

    case UPDATE_CART: {
      return action.middle?{ ...state, middle: action.middle}:state;
    }

    case DROP_CART: {
      return { ...state, ...initialState};
    }

    default: {
      return state;
    }
  }
};