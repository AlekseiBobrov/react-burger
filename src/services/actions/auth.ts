import { registerRequest, loginRequest, logoutRequest, getUserDataRequest, setUserDataRequest } from '../../utils/api';
import { saveTokens, deleteTokens } from '../../utils';

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
} from '../constants';

import { AppDispatch, AppThunk, authResponse } from '../../utils/types';

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS
  readonly payload: {
    readonly isAuth: boolean,
    readonly email: string,
    readonly name: string,
  }
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED
}

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS
  readonly payload: {
    readonly isAuth: boolean,
    readonly email: string,
    readonly name: string,
  }
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS
  readonly payload: {
    readonly isAuth: boolean,
    readonly email: string,
    readonly name: string,
  }
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS
  readonly payload: {
    readonly isAuth: boolean,
    readonly email: string,
    readonly name: string,
  }
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED
}

export interface ISetUserRequestAction {
  readonly type: typeof SET_USER_REQUEST
}

export interface ISetUserSuccessAction {
  readonly type: typeof SET_USER_SUCCESS
  readonly payload: {
    readonly email: string,
    readonly name: string,
  }
}

export interface ISetUserFailedAction {
  readonly type: typeof SET_USER_FAILED
}

export type TAuthActions =
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | ISetUserRequestAction
  | ISetUserSuccessAction
  | ISetUserFailedAction;

export const registerRequestAction = (): IRegisterRequestAction => ({
  type: REGISTER_REQUEST
})

export const registerSuccessAction = (response: authResponse): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload: { isAuth: true, ...response.user }
})

export const registerFailedAction = (): IRegisterFailedAction => ({
  type: REGISTER_FAILED
})

export const makeRegister: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
  dispatch(registerRequestAction());

  return registerRequest(email, password, name)
    .then(data => {
      saveTokens(data);
      dispatch(registerSuccessAction(data));
    })
    .catch(err => {
      console.log('makeRegister ERROR:', err);
      dispatch(registerFailedAction());
    });
}

export const loginRequestAction = (): ILoginRequestAction => ({
  type: LOGIN_REQUEST
})

export const loginSuccessAction = (response: authResponse): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: { isAuth: true, ...response.user },
})

export const loginFailedAction = (): ILoginFailedAction => ({
  type: LOGIN_FAILED
})

export const makeLogin: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch(loginRequestAction());

  return loginRequest(email, password)
    .then(data => {
      saveTokens(data);
      dispatch(loginSuccessAction(data));
    })
    .catch(err => {
      console.log('makeLogin ERROR:', err);
      dispatch(loginFailedAction());
    });
}

export const logoutRequestAction = (): ILogoutRequestAction => ({
  type: LOGOUT_REQUEST
})

export const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
  payload: { name: '', email: '', isAuth: false }
})

export const logoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_FAILED
})

export const makeLogout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(logoutRequestAction());
  return logoutRequest()
    .then(data => {
      dispatch(logoutSuccessAction());
      deleteTokens();
    })
    .catch(err => {
      console.log('makeLogout ERROR:', err);
      dispatch(logoutFailedAction());
    });
}

export const getUserRequestAction = (): IGetUserRequestAction => ({
  type: GET_USER_REQUEST
})

export const getUserSuccessAction = (response: authResponse['user']): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  payload: { isAuth: true, ...response },
})

export const getUserFailedAction = (): IGetUserFailedAction => ({
  type: GET_USER_FAILED
})

export const getUserData: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getUserRequestAction());
  return getUserDataRequest()
    .then(data => {
      dispatch(getUserSuccessAction(data));
    })
    .catch(err => {
      console.log('getUserData ERROR:', err);
      dispatch(getUserFailedAction());
    });
}

export const setUserRequestAction = (): ISetUserRequestAction => ({
  type: SET_USER_REQUEST
})

export const setUserSuccessAction = (response: authResponse['user']): ISetUserSuccessAction => ({
  type: SET_USER_SUCCESS,
  payload: { ...response },
})

export const setUserFailedAction = (): ISetUserFailedAction => ({
  type: SET_USER_FAILED
})

export const setUserData: AppThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch(setUserRequestAction());
  return setUserDataRequest(name, email, password)
    .then(data => {
      dispatch(setUserSuccessAction(data));
    })
    .catch(err => {
      console.log('setUserData ERROR:', err);
      dispatch(setUserFailedAction());
    });
}



