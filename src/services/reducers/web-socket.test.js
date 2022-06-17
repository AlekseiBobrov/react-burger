import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from '../constants';

import {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage,
  wsSendMessage,
} from '../actions/web-socket'

import {
  initialState,
  wsReducer as reducer
} from './web-socket'

const orderNumber = 1000;

describe('Redux ws store', () => {

  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('Should created WS_CONNECTION_START action', () => {
    const expectedAction = {
      type: WS_CONNECTION_START
    };

    expect(wsConnectionStart()).toEqual(expectedAction)
  })

  test('Should created WS_SEND_MESSAGE action', () => {
    const expectedAction = {
      type:  WS_SEND_MESSAGE
    };

    expect(wsSendMessage()).toEqual(expectedAction)
  })

  test('Should created WS_CONNECTION_ERROR action', () => {
    const expectedAction = {
      type:  WS_CONNECTION_ERROR
    };

    expect(wsConnectionError()).toEqual(expectedAction)
  })

  test('Should return state with wsConnected: false and error passed in wsConnectionError', () => {
    const errorEvent = new Error("errorEvent");
    const action = wsConnectionError(errorEvent);
    const expectedState = { ...initialState, error: errorEvent };

    expect(reducer({ ...initialState, wsConnected: true }, action)).toEqual(expectedState);
  })

  test('Should created WS_CONNECTION_CLOSED action', () => {
    const expectedAction = {
      type: WS_CONNECTION_CLOSED
    };

    expect(wsConnectionClosed()).toEqual(expectedAction)
  })

  test('Should return state initialState with error: undefined after wsConnectionClosed', () => {
    const action = wsConnectionClosed();
    const expectedState = { ...initialState, error: undefined };

    expect(reducer({ ...initialState, wsConnected: true }, action)).toEqual(expectedState);
  })

  test('Should created WS_CONNECTION_SUCCESS action', () => {
    const expectedAction = {
      type: WS_CONNECTION_SUCCESS,
    };

    expect(wsConnectionSuccess()).toEqual(expectedAction);
  })

  test('Should return state with error: undefined & wsConnected: true', () => {
    const action = wsConnectionSuccess();
    const expectedState = { ...initialState, error: undefined, wsConnected: true };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

  test('Should created WS_GET_MESSAGE action', () => {
    const expectedAction = {
      type: WS_GET_MESSAGE,
      payload: "message"
    };

    expect(wsGetMessage("message")).toEqual(expectedAction)
  })

  test('Should return state with passed message added to messages array', () => {
    const action = wsGetMessage("message");
    const expectedState = { ...initialState, error: undefined, messages: [ "message" ] };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })
})