import { registerRequest } from '../../utils/api'; //'../../utils/fake-api' //fakeAPI for test without internet
import { setCookie } from '../../utils'

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

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