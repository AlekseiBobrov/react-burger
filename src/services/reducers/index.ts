import { combineReducers } from 'redux';

import { ingredientReducer } from './ingredients'
import { cartReducer } from './cart'
import { orderReducer } from './order'
import { forgotPasswordReducer } from './forgot-password'
import { authReducer } from './auth'

import { SWITCH_TAB, CLICK_TAB } from '../actions';

interface TabActionType {
  type: string,
  tab?: string,
  isClick?: boolean
}

const initialState = {
  currentTab: 'Булки',
  isClick: false,
};

const tabReducer = (state = initialState, action:TabActionType) => {
  switch (action.type) {
    case SWITCH_TAB: {
      return { ...state, currentTab: action.tab}
    }
    case CLICK_TAB: {
      return { ...state, tabClick: action.isClick}
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  menu: ingredientReducer,
  tab: tabReducer,
  cart: cartReducer,
  order: orderReducer,
  reset: forgotPasswordReducer,
  auth: authReducer, 
});