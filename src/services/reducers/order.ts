import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_RESET,
} from '../constants';

import { TGetOrderActions } from '../actions';

import { IOrderState } from '../../utils/types'

const initialState: IOrderState = {
  orderNumber: undefined,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TGetOrderActions): IOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, orderRequest: false, orderNumber: action.orderNumber };
    }
    case  GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case GET_ORDER_RESET: {
      return { ...state, orderNumber: undefined };
    }
    default: {
      return state;
    }
  }
};