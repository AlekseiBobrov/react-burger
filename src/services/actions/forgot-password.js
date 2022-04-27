import { resetPasswordRequest } from '../../utils/api'; //'../../utils/fake-api' //fakeAPI for test without internet
import { updatePasswordRequest } from '../../utils/api'; //'../../utils/fake-api' //fakeAPI for test without internet

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const UPDATE_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export function resetPassword(email) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    resetPasswordRequest(email)
      .then(data => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          message: data
        });
      })
      .catch(err => {
        console.log('resetPassword ERROR:', err);
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      });
  };
}

export function updatePassword(password, token) {
    return function (dispatch) {
      dispatch({
        type: UPDATE_PASSWORD_REQUEST
      });
      updatePasswordRequest(password, token)
        .then(data => {
          dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            message: data
          });
        })
        .catch(err => {
          console.log('updatePassword ERROR:', err);
          dispatch({
            type: UPDATE_PASSWORD_FAILED
          });
        });
    };
  }