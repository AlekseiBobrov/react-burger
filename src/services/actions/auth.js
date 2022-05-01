import { registerRequest, loginRequest, logoutRequest, getUserDataRequest, setUserDataRequest  } from '../../utils/api'; //'../../utils/fake-api' //fakeAPI for test without internet
import { saveTokens } from '../../utils'

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const SET_USER_REQUEST = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';

export function makeRegister(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    registerRequest(email, password, name)
      .then(data => {
        saveTokens(data);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data.user,
        });
      })
      .catch(err => {
        console.log('makeRegister ERROR:', err);
        dispatch({
          type: REGISTER_FAILED
        });
      });
  };
}

export function makeLogin(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    loginRequest(email, password)
      .then(data => {
        saveTokens(data);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data.user,
        });
      })
      .catch(err => {
        console.log('makeLogin ERROR:', err);
        dispatch({
          type: LOGIN_FAILED
        });
      });
  };
}

export function makeLogout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    logoutRequest()
      .then(data => {
        dispatch({
          type: LOGOUT_SUCCESS ,
        });
      })
      .catch(err => {
        console.log('makeLogout ERROR:', err);
        dispatch({
          type: LOGOUT_FAILED
        });
      });
  };
}

export function getUserData() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    getUserDataRequest()
      .then(data => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: data
        });
      })
      .catch(err => {
        console.log('getUserData ERROR:', err);
        dispatch({
          type: GET_USER_FAILED
        });
      });
  };
}

export function setUserData(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: SET_USER_REQUEST
    });
    setUserDataRequest(name, email, password)
      .then(data => {
        dispatch({
          type: SET_USER_SUCCESS,
          payload: data
        });
      })
      .catch(err => {
        console.log('setUserData ERROR:', err);
        dispatch({
          type: SET_USER_FAILED
        });
      });
  };
}



