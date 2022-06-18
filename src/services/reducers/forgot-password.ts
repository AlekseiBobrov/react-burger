import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
} from '../constants';

import { TForgotPasswordActions } from '../actions'

import { IForgotPasswordState } from '../../utils/types';

export const initialState:  IForgotPasswordState = {
  message: '',
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordFailed: false,
};

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions): IForgotPasswordState => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return { ...state, message: '', resetPasswordRequest: true };
    }
    case RESET_PASSWORD_SUCCESS: {
      return { ...state, resetPasswordFailed: false, resetPasswordRequest: false, ...action.payload };
    }
    case RESET_PASSWORD_FAILED: {
      return { ...state, resetPasswordFailed: true, resetPasswordRequest: false };
    }
    case UPDATE_PASSWORD_REQUEST: {
      return { ...state, message: '', updatePasswordRequest: true };
    }
    case UPDATE_PASSWORD_SUCCESS: {
      return { ...state, updatePasswordFailed: false, updatePasswordRequest: false, ...action.payload };
    }
    case UPDATE_PASSWORD_FAILED: {
      return { ...state, updatePasswordFailed: true, updatePasswordRequest: false };
    }
    default: {
      return state;
    }
  }
};