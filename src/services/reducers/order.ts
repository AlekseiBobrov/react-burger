import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from '../actions/order';


interface OrderActionType {
  type: string,
  orderNumber?: string
}

interface OrderStateType {
    orderNumber: undefined | string,
    orderRequest: boolean,
    orderFailed: boolean,
  }

const initialState = {
  orderNumber: undefined,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state:OrderStateType = initialState, action: OrderActionType):OrderStateType => {
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
    default: {
      return state;
    }
  }
};