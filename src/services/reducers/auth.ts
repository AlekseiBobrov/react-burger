import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from '../actions/auth';

interface authActionType {
  type: string,
}

interface authStateType {
    registerRequest: boolean,
    registerFailed: boolean,
    loginRequest: boolean,
    loginFailed: boolean,
    logoutRequest: boolean,
    logoutFailed: boolean,
  }

const initialState = {
  registerRequest: false,
  registerFailed: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
};

export const authReducer = (state: authStateType = initialState, action: authActionType): authStateType => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return { ...state, registerRequest: true };
    }
    case REGISTER_SUCCESS: {
      return { ...state, registerFailed: false, registerRequest: false };
    }
    case  REGISTER_FAILED: {
      return { ...state, registerFailed: true, registerRequest: false };
    }
    case LOGIN_REQUEST: {
      return { ...state, loginRequest: true };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loginFailed: false, loginRequest: false };
    }
    case  LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    case LOGOUT_REQUEST: {
      return { ...state, logoutRequest: true };
    }
    case LOGOUT_SUCCESS: {
      return { ...state, logoutFailed: false, logoutRequest: false };
    }
    case  LOGOUT_FAILED: {
      return { ...state, logoutFailed: true, logoutRequest: false };
    }
    default: {
      return state;
    }
  }
};