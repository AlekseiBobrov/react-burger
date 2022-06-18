import { ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_CART, DROP_CART } from '../constants';
import { TCartActions } from '../actions/cart';
import type { ICartState } from '../../utils/types.js'

export const initialState: ICartState = {
  buns: [],
  middle: [],
};

export const cartReducer = (state = initialState, action: TCartActions): ICartState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const { ingredient } = action.payload;
      if (ingredient.type === 'bun') {
        return { ...state, buns: [ingredient, ingredient] };
      } else {
        const middle = state.middle.slice();
        middle.push(ingredient)
        return { ...state, middle: middle };
      }
    }

    case REMOVE_INGREDIENT: {
      const { ingredient } = action.payload;
      const index = action.payload.orderIndex;
      if (ingredient.type === 'bun') {
        return { ...state, buns: [] };
      } else {
        const middle = state.middle.slice();
        middle.splice(index, 1);
        return { ...state, middle: middle };
      }
    }

    case UPDATE_CART: {
      return { ...state, middle: action.payload.middle };
    }

    case DROP_CART: {
      return { ...state, ...initialState };
    }

    default: {
      return state;
    }
  }
};