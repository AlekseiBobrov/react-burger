import { combineReducers } from 'redux';

import { ingredientReducer } from './ingredients'
import { cartReducer } from './cart'
import { orderReducer } from './order'
import { forgotPasswordReducer } from './forgot-password'
import { authReducer } from './auth'
import { tabReducer } from './tab'
import { wsReducer } from './web-socket';

export const rootReducer = combineReducers({
  menu: ingredientReducer,
  tab: tabReducer,
  cart: cartReducer,
  order: orderReducer,
  reset: forgotPasswordReducer,
  auth: authReducer,
  ws: wsReducer,
});