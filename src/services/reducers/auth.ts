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
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAILED,
} from '../actions/auth';

interface authActionType {
  type: string,
  payload?: {email: string, name:string}
}

interface authStateType {
    email: string,
    name: string,
    registerRequest: boolean,
    registerFailed: boolean,
    loginRequest: boolean,
    loginFailed: boolean,
    logoutRequest: boolean,
    logoutFailed: boolean,
    getUserRequest: boolean,
    getUserFailed: boolean,
  }

const initialState = {
  email: '',
  name: '',
  registerRequest: false,
  registerFailed: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailed: false,
}

export const authReducer = (state: authStateType = initialState, action: authActionType): authStateType => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return { ...state, registerRequest: true };
    }
    case REGISTER_SUCCESS: {
      return { ...state, registerFailed: false, registerRequest: false, ...action.payload };
    }
    case  REGISTER_FAILED: {
      return { ...state, registerFailed: true, registerRequest: false };
    }
    case LOGIN_REQUEST: {
      return { ...state, loginRequest: true };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loginFailed: false, loginRequest: false, ...action.payload };
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
    case GET_USER_REQUEST: {
      return { ...state, getUserRequest: true };
    }
    case GET_USER_SUCCESS: {
      return { ...state, getUserFailed: false, getUserRequest: false, ...action.payload};
    }
    case  GET_USER_FAILED: {
      return { ...state, getUserFailed: true, getUserRequest: false };
    }
    case SET_USER_REQUEST: {
      return { ...state, getUserRequest: true };
    }
    case SET_USER_SUCCESS: {
      return { ...state, getUserFailed: false, getUserRequest: false, ...action.payload};
    }
    case  SET_USER_FAILED: {
      return { ...state, getUserFailed: true, getUserRequest: false };
    }
    default: {
      return state;
    }
  }
};