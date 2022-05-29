import { getOrderRequest } from '../../utils/api'; //'../../utils/fake-api' //fakeAPI for test without internet
import { dropCart } from '../actions/cart';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_RESET = 'GET_ORDER_RESET';

export function getOrder(ingredients) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderRequest(ingredients)
      .then(data => {
        dispatch({
          type: GET_ORDER_SUCCESS ,
          orderNumber: data
        });
        dispatch( dropCart() );
      })
      .catch(err => {
        console.log('getOrder ERROR:', err);
        dispatch({
          type: GET_ORDER_FAILED
        });
      });
  };
}