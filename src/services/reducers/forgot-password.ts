import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
} from '../actions/forgot-password';

interface forgotPasswordActionType {
  type: string,
  message?: string,
  email?: string,
  password?: string,
  token?: string,
}

interface forgotPasswordStateType {
  message: string | undefined,
  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,
  updatePasswordRequest: boolean,
  updatePasswordFailed: boolean,
}

const initialState = {
  message: '',
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordFailed: false,
};

export const forgotPasswordReducer = (state: forgotPasswordStateType = initialState, action: forgotPasswordActionType): forgotPasswordStateType => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return { ...state, message: '', resetPasswordRequest: true };
    }
    case RESET_PASSWORD_SUCCESS: {
      return { ...state, resetPasswordFailed: false, resetPasswordRequest: false, message: action.message };
    }
    case RESET_PASSWORD_FAILED: {
      return { ...state, resetPasswordFailed: true, resetPasswordRequest: false };
    }
    case UPDATE_PASSWORD_REQUEST: {
      return { ...state, message: '', updatePasswordRequest: true };
    }
    case UPDATE_PASSWORD_SUCCESS: {
      return { ...state, updatePasswordFailed: false, updatePasswordRequest: false, message: action.message };
    }
    case UPDATE_PASSWORD_FAILED: {
      return { ...state, updatePasswordFailed: true, updatePasswordRequest: false };
    }
    default: {
      return state;
    }
  }
};