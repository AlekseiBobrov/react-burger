import { ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_CART, DROP_CART } from '../actions/cart';
import type { CartType, CartIngredient } from '../../utils/types.js'

interface CartActionType {
  type: string,
  ingredient: CartIngredient,
  orderIndex?: number,
  middle?: CartIngredient[],
}


const initialState = {
  buns: [],
  middle: [],
};

export const cartReducer = (state: CartType = initialState, action: CartActionType): CartType => {
  switch (action.type) {

    case ADD_INGREDIENT: {
      if (action.ingredient.type === 'bun'){
          return { ...state, buns: [action.ingredient, action.ingredient]};
      } else {
        const middle = state.middle.slice();
        middle.push(action.ingredient)
        return { ...state, middle: middle};
      }
    }

    case REMOVE_INGREDIENT: {
      if (action.ingredient.type === 'bun'){
          return { ...state, buns: []};
      } else {
        console.log('action.orderIndex', action.orderIndex)
        const index = action.orderIndex?action.orderIndex:0;
        const middle = state.middle.slice();
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