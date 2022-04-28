import { registerRequest, loginRequest } from '../../utils/api'; //'../../utils/fake-api' //fakeAPI for test without internet
import { setCookie } from '../../utils'

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

function saveTokens(response) {
  setCookie('accessToken', response.accessToken.split('Bearer ')[1]);
  window.localStorage.setItem('refreshToken', response.refreshToken);
}

export function makeRegister(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    registerRequest(email, password, name)
      .then(data => {
        saveTokens(data);
        dispatch({
          type: REGISTER_SUCCESS ,
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
          type: LOGIN_SUCCESS ,
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