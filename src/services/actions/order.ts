import { getOrderRequest } from '../../utils/api';
import { dropCart } from './cart';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_RESET,
} from '../constants'

import { AppDispatch, AppThunk } from '../../utils/types';

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: {
    readonly orderNumber: number
  }
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderResetAction {
  readonly type: typeof GET_ORDER_RESET;
}

export type TGetOrderActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IGetOrderResetAction;

export const getOrderRequestAction = (): IGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST
})

export const getOrderSuccessAction = (orderNumber: number): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  payload: {
    orderNumber
  }
})

export const getOrderFailedAction = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED
})

export const getOrderResetAction = (): IGetOrderResetAction => ({
  type: GET_ORDER_RESET
})

export const getOrder: AppThunk = (ingredients) => (dispatch: AppDispatch) => {
  dispatch(getOrderRequestAction());

  return getOrderRequest(ingredients)
    .then(data => {
      dispatch(getOrderSuccessAction(data));
      dispatch(dropCart());
    })
    .catch(err => {
      console.log('getOrder ERROR:', err);
      dispatch(getOrderFailedAction());
    });
}