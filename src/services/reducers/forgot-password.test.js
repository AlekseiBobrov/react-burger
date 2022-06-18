import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
} from '../constants';

import {
  resetPasswordRequestAction,
  resetPasswordSuccessAction,
  resetPasswordFailedAction,
  resetPasswordThunk,
  updatePasswordRequestAction,
  updatePasswordSuccessAction,
  updatePasswordFailedAction,
  updatePasswordThunk,
} from '../actions/forgot-password'

import {
  initialState,
  forgotPasswordReducer as reducer
} from './forgot-password'

const message = "action success";

describe('Redux reset store', () => {

  beforeEach(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue({ success: true,  message }),
        ok: true
      })
  })

  afterEach(() => {
    jest.restoreAllMocks();
  })

  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('Should created RESET_PASSWORD_REQUEST action', () => {
    const expectedAction = {
      type: RESET_PASSWORD_REQUEST
    };

    expect(resetPasswordRequestAction()).toEqual(expectedAction)
  })

  test('Should return state with resetPasswordRequest: true', () => {
    const action = resetPasswordRequestAction();
    const expectedState = { ...initialState, resetPasswordRequest: true };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

  test('Should created RESET_PASSWORD_FAILED action', () => {
    const expectedAction = {
      type: RESET_PASSWORD_FAILED
    };

    expect(resetPasswordFailedAction()).toEqual(expectedAction)
  })

  test('Should return state with resetPasswordFailed: true, resetPasswordRequest: false', () => {
    const action = resetPasswordFailedAction();
    const expectedState = { ...initialState, resetPasswordFailed: true, resetPasswordRequest: false };

    expect(reducer({ ...initialState, resetPasswordRequest: true }, action)).toEqual(expectedState);
  })

  test('Should created RESET_PASSWORD_SUCCESS action with message in payload', () => {
    const expectedAction = {
      type: RESET_PASSWORD_SUCCESS,
      payload: {
        message
      }
    };

    expect(resetPasswordSuccessAction(message)).toEqual(expectedAction);
  })

  test('Should return state with passed message in resetPasswordSuccessAction and other properties equal false', () => {
    const action = resetPasswordSuccessAction(message);
    const expectedState = { ...initialState, message };

    expect(reducer({ ...initialState, resetPasswordRequest: true }, action)).toEqual(expectedState);
  })

  test('Should fired 2 actions after resetPasswordThunk is dispatching', () => {
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    const store = mockStore(initialState);

    const expectedActions = [
      { type: RESET_PASSWORD_REQUEST },
      { type: RESET_PASSWORD_SUCCESS, payload: { message } },
    ]

    return store
      .dispatch(resetPasswordThunk([]))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  })

  test('Should created  UPDATE_PASSWORD_REQUEST action', () => {
    const expectedAction = {
      type:  UPDATE_PASSWORD_REQUEST
    };

    expect(updatePasswordRequestAction()).toEqual(expectedAction)
  })

  test('Should return state with updatePasswordRequest: true', () => {
    const action = updatePasswordRequestAction();
    const expectedState = { ...initialState, updatePasswordRequest: true };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

  test('Should created  UPDATE_PASSWORD_FAILED action', () => {
    const expectedAction = {
      type:  UPDATE_PASSWORD_FAILED
    };

    expect(updatePasswordFailedAction()).toEqual(expectedAction)
  })

  test('Should return state with updatePasswordFailed: true, updatePasswordRequest: false', () => {
    const action = updatePasswordFailedAction();
    const expectedState = { ...initialState, updatePasswordFailed: true, updatePasswordRequest: false };

    expect(reducer({ ...initialState, updatePasswordRequest: true }, action)).toEqual(expectedState);
  })

  test('Should created  UPDATE_PASSWORD_SUCCESS action with message in payload', () => {
    const expectedAction = {
      type:  UPDATE_PASSWORD_SUCCESS,
      payload: {
        message
      }
    };

    expect(updatePasswordSuccessAction(message)).toEqual(expectedAction);
  })

  test('Should fired 2 actions after updatePasswordThunk is dispatching', () => {
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    const store = mockStore(initialState);

    const expectedActions = [
      { type:  UPDATE_PASSWORD_REQUEST },
      { type:  UPDATE_PASSWORD_SUCCESS, payload: { message } },
    ]

    return store
      .dispatch(updatePasswordThunk([]))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  })
})