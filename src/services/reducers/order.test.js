import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_RESET,
  DROP_CART,
} from '../constants';

import {
  getOrderRequestAction,
  getOrderSuccessAction,
  getOrderFailedAction,
  getOrderResetAction,
  getOrder
} from '../actions/order'

import {
  initialState,
  orderReducer as reducer
} from './order'

const orderNumber = 1000;

describe('Redux order store', () => {

  beforeEach(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue({ success: true,  order: { number:  orderNumber} }),
        ok: true
      })

      Object.defineProperty(document, 'cookie', {
          writable: true,
          value: 'accessToken=Bearer 12345',
      })
  })

  afterEach(() => {
    jest.restoreAllMocks();
  })

  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('Should created GET_ORDER_REQUEST action', () => {
    const expectedAction = {
      type: GET_ORDER_REQUEST
    };

    expect(getOrderRequestAction()).toEqual(expectedAction)
  })

  test('Should return state with orderRequest: true', () => {
    const action = getOrderRequestAction();
    const expectedState = { ...initialState, orderRequest: true };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

  test('Should created GET_ORDER_FAILED action', () => {
    const expectedAction = {
      type: GET_ORDER_FAILED
    };

    expect(getOrderFailedAction()).toEqual(expectedAction)
  })

  test('Should return state with orderFailed: true, orderRequest: false', () => {
    const action = getOrderFailedAction();
    const expectedState = { ...initialState, orderFailed: true, orderRequest: false };

    expect(reducer({ ...initialState, orderRequest: true }, action)).toEqual(expectedState);
  })

  test('Should created GET_ORDER_SUCCESS action with orderNumber in payload', () => {
    const expectedAction = {
      type: GET_ORDER_SUCCESS,
      payload: {
        orderNumber: orderNumber
      }
    };

    expect(getOrderSuccessAction(orderNumber)).toEqual(expectedAction);
  })

  test('Should return state with passed orderNumber in getOrderSuccessAction and other properties equal false', () => {
    const action = getOrderSuccessAction(orderNumber);
    const expectedState = { ...initialState, orderNumber };

    expect(reducer({ ...initialState, orderRequest: true }, action)).toEqual(expectedState);
  })

  test('Should created GET_ORDER_RESET action', () => {
    const expectedAction = {
      type: GET_ORDER_RESET
    };

    expect(getOrderResetAction()).toEqual(expectedAction)
  })

  test('Should return empty cart (initialState) after getOrderResetAction', () => {
    const action = getOrderResetAction();
    const state = { ...initialState, orderNumber };

    expect(reducer(state, action)).toEqual(initialState);
  })

  test('Should fired 3 actions after getOrder is dispatching', () => {
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    const store = mockStore(initialState);

    const expectedActions = [
      { type: GET_ORDER_REQUEST },
      { type: GET_ORDER_SUCCESS, payload: { orderNumber } },
      { type: DROP_CART }, 
    ]

    return store
      .dispatch(getOrder([]))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  })

})