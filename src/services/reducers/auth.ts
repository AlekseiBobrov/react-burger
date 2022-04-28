import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../actions/auth';

interface authActionType {
  type: string,
}

interface authStateType {
    registerRequest: boolean,
    registerFailed: boolean,
    loginRequest: boolean,
    loginFailed: boolean,
  }

const initialState = {
  registerRequest: false,
  registerFailed: false,
  loginRequest: false,
  loginFailed: false,
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
    default: {
      return state;
    }
  }
};