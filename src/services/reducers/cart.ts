import { ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_CART, DROP_CART } from '../constants';
import { TCartActions } from '../actions/cart';
import type { ICartState } from '../../utils/types.js'

const initialState: ICartState = {
  buns: [],
  middle: [],
};

export const cartReducer = (state = initialState, action: TCartActions): ICartState => {
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
        const index = action.orderIndex;
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