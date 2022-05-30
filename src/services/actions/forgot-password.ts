import { resetPasswordRequest, updatePasswordRequest } from '../../utils/api';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
} from '../constants'

import { AppDispatch, AppThunk } from '../../utils/types';

export interface IResetPassRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPassSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly message: string;
}

export interface IResetPassFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IUpdatePassRequest {
  readonly type: typeof UPDATE_PASSWORD_REQUEST;
}

export interface IUpdatePassSuccess {
  readonly type: typeof UPDATE_PASSWORD_SUCCESS;
  readonly message: string;
}

export interface IUpdatePassFailed {
  readonly type: typeof UPDATE_PASSWORD_FAILED;
}

export type TForgotPasswordActions =
  | IResetPassRequest
  | IResetPassSuccess
  | IResetPassFailed
  | IUpdatePassRequest
  | IUpdatePassSuccess
  | IUpdatePassFailed;

export const resetPasswordRequestAction = (): IResetPassRequest => ({
  type: RESET_PASSWORD_REQUEST
})

export const resetPasswordSuccessAction = (respData: string): IResetPassSuccess => ({
  type: RESET_PASSWORD_SUCCESS,
  message: respData
})

export const resetPasswordFailedAction = (): IResetPassFailed => ({
  type: RESET_PASSWORD_FAILED
})

export const updatePasswordRequestAction = (): IUpdatePassRequest => ({
  type: UPDATE_PASSWORD_REQUEST
})

export const updatePasswordSuccessAction = (respData: string): IUpdatePassSuccess => ({
  type: UPDATE_PASSWORD_SUCCESS,
  message: respData
})

export const updatePasswordFailedAction = (): IUpdatePassFailed => ({
  type: UPDATE_PASSWORD_FAILED
})

export const resetPasswordThunk: AppThunk = (email: string) => (dispatch: AppDispatch) => {
  dispatch(resetPasswordRequestAction());

  resetPasswordRequest(email)
    .then(data => {
      dispatch(resetPasswordSuccessAction(data));
    })
    .catch(err => {
      console.log('resetPassword ERROR:', err);
      dispatch(resetPasswordFailedAction());
    });

}

export const updatePasswordThunk: AppThunk = (password: string, token: string): (dispatch: AppDispatch) => void => {
  return function (dispatch) {
    dispatch(updatePasswordRequestAction());

    updatePasswordRequest(password, token)
      .then(data => {
        dispatch( updatePasswordSuccessAction(data) );
      })
      .catch(err => {
        console.log('updatePassword ERROR:', err);
        dispatch( updatePasswordFailedAction() );
      });
  };
}