import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

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


import {
  registerRequestAction,
  registerSuccessAction,
  registerFailedAction,
  makeRegister,
  loginRequestAction,
  loginSuccessAction,
  loginFailedAction,
  makeLogin,
  logoutRequestAction,
  logoutSuccessAction,
  logoutFailedAction,
  makeLogout,
  getUserRequestAction,
  getUserSuccessAction,
  getUserFailedAction,
  getUserData,
  setUserRequestAction,
  setUserSuccessAction,
  setUserFailedAction,
  setUserData,
} from '../actions/auth'

import {
  initialState,
  authReducer as reducer
} from './auth'

const name = 'name';
const email = 'email@ya.ru';
const pass = 'password'

const authResponse = {
  success: true,
  accessToken: 'Bearer 12345',
  refreshToken: '12345',
  user: {
    email: email,
    name: name
  }
}

describe('Redux auth store', () => {

  beforeEach(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(authResponse),
        ok: true
      })

      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'accessToken=Bearer 12345',
    })
  })

  afterEach(() => {
    jest.restoreAllMocks();
  })
  //REGISTER TESTS
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('Should created REGISTER_REQUEST action', () => {
    const expectedAction = {
      type: REGISTER_REQUEST
    };

    expect(registerRequestAction()).toEqual(expectedAction)
  })

  test('Should return state with registerRequest: true', () => {
    const action = registerRequestAction();
    const expectedState = { ...initialState, registerRequest: true };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

  test('Should created REGISTER_FAILED action', () => {
    const expectedAction = {
      type: REGISTER_FAILED
    };

    expect(registerFailedAction()).toEqual(expectedAction)
  })

  test('Should return state with registerFailed: true, registerRequest: false', () => {
    const action = registerFailedAction();
    const expectedState = { ...initialState, registerFailed: true, registerRequest: false };

    expect(reducer({ ...initialState, registerRequest: true }, action)).toEqual(expectedState);
  })

  test('Should created REGISTER_SUCCESS action with user data from response in payload', () => {
    const expectedAction = {
      type: REGISTER_SUCCESS,
      payload: {
        isAuth: true,
        ...authResponse.user }
    };

    expect(registerSuccessAction(authResponse)).toEqual(expectedAction);
  })

  test('Should return state with passed user data from response in registerSuccessAction and other properties equal false', () => {
    const action = registerSuccessAction(authResponse);
    const expectedState = { ...initialState, isAuth: true, ...authResponse.user };

    expect(reducer({ ...initialState, registerRequest: true }, action)).toEqual(expectedState);
  })

  test('Should fired 2 actions after makeRegister is dispatching', () => {
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    const store = mockStore(initialState);

    const expectedActions = [
      { type: REGISTER_REQUEST },
      { type: REGISTER_SUCCESS, payload: { isAuth: true, ...authResponse.user } },
    ]

    return store
      .dispatch(makeRegister(email, pass, name))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  })
  //LOGIN TESTS
  test('Should created LOGIN_REQUEST action', () => {
    const expectedAction = {
      type: LOGIN_REQUEST
    };

    expect(loginRequestAction()).toEqual(expectedAction)
  })

  test('Should return state with loginRequest: true', () => {
    const action = loginRequestAction();
    const expectedState = { ...initialState, loginRequest: true };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

  test('Should created LOGIN_FAILED action', () => {
    const expectedAction = {
      type: LOGIN_FAILED
    };

    expect(loginFailedAction()).toEqual(expectedAction)
  })

  test('Should return state with loginFailed: true, loginRequest: false', () => {
    const action = loginFailedAction();
    const expectedState = { ...initialState, loginFailed: true, loginRequest: false };

    expect(reducer({ ...initialState, loginRequest: true }, action)).toEqual(expectedState);
  })

  test('Should created LOGIN_SUCCESS action with user data from response in payload', () => {
    const expectedAction = {
      type: LOGIN_SUCCESS,
      payload: {
        isAuth: true,
        ...authResponse.user }
    };

    expect(loginSuccessAction(authResponse)).toEqual(expectedAction);
  })

  test('Should return state with passed user data from response in loginSuccessAction and other properties equal false', () => {
    const action = loginSuccessAction(authResponse);
    const expectedState = { ...initialState, isAuth: true, ...authResponse.user };

    expect(reducer({ ...initialState, loginRequest: true }, action)).toEqual(expectedState);
  })

  test('Should fired 2 actions after makeLogin is dispatching', () => {
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    const store = mockStore(initialState);

    const expectedActions = [
      { type: LOGIN_REQUEST },
      { type: LOGIN_SUCCESS, payload: { isAuth: true, ...authResponse.user } },
    ]

    return store
      .dispatch(makeLogin(email, pass))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  })
  //LOGOUT TESTS
  test('Should created LOGOUT_REQUEST action', () => {
    const expectedAction = {
      type: LOGOUT_REQUEST
    };

    expect(logoutRequestAction()).toEqual(expectedAction)
  })

  test('Should return state with logoutRequest: true', () => {
    const action = logoutRequestAction();
    const expectedState = { ...initialState, logoutRequest: true };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

  test('Should created LOGOUT_FAILED action', () => {
    const expectedAction = {
      type: LOGOUT_FAILED
    };

    expect(logoutFailedAction()).toEqual(expectedAction)
  })

  test('Should return state with logoutFailed: true, logoutRequest: false', () => {
    const action = logoutFailedAction();
    const expectedState = { ...initialState, logoutFailed: true, logoutRequest: false };

    expect(reducer({ ...initialState, logoutRequest: true }, action)).toEqual(expectedState);
  })

  test('Should created LOGOUT_SUCCESS action with empty user data in payload', () => {
    const expectedAction = {
      type: LOGOUT_SUCCESS,
      payload: { name: '', email: '', isAuth: false }
    };

    expect(logoutSuccessAction(authResponse)).toEqual(expectedAction);
  })

  test('Should return initialState after logoutSuccessAction', () => {
    const action = logoutSuccessAction();
    const expectedState = { ...initialState };

    expect(reducer({ ...initialState, logoutRequest: true }, action)).toEqual(expectedState);
  })

  test('Should fired 2 actions after makeLogout is dispatching', () => {
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    const store = mockStore(initialState);

    const expectedActions = [
      { type: LOGOUT_REQUEST },
      { type: LOGOUT_SUCCESS, payload: { name: '', email: '', isAuth: false } },
    ]

    return store
      .dispatch(makeLogout())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  })
  //GET_USER TESTS
  test('Should created GET_USER_REQUEST action', () => {
    const expectedAction = {
      type: GET_USER_REQUEST
    };

    expect(getUserRequestAction()).toEqual(expectedAction)
  })

  test('Should return state with getUserRequest: true', () => {
    const action = getUserRequestAction();
    const expectedState = { ...initialState, getUserRequest: true };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

  test('Should created GET_USER_FAILED action', () => {
    const expectedAction = {
      type: GET_USER_FAILED
    };

    expect(getUserFailedAction()).toEqual(expectedAction)
  })

  test('Should return state with getUserFailed: true, getUserRequest: false', () => {
    const action = getUserFailedAction();
    const expectedState = { ...initialState, getUserFailed: true, getUserRequest: false };

    expect(reducer({ ...initialState, getUserRequest: true }, action)).toEqual(expectedState);
  })

  test('Should created GET_USER_SUCCESS action with user data from response in payload', () => {
    const expectedAction = {
      type: GET_USER_SUCCESS,
      payload: { isAuth: true, ...authResponse.user }
    };

    expect(getUserSuccessAction(authResponse.user)).toEqual(expectedAction);
  })

  test('Should return state with user data from response after getUserSuccessAction', () => {
    const action = getUserSuccessAction(authResponse.user);
    const expectedState = { ...initialState, ...authResponse.user, isAuth: true };

    expect(reducer({ ...initialState, getUserRequest: true }, action)).toEqual(expectedState);
  })

  test('Should fired 2 actions after getUserData is dispatching', () => {
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    const store = mockStore(initialState);

    const expectedActions = [
      { type: GET_USER_REQUEST },
      { type: GET_USER_SUCCESS, payload: { isAuth: true, ...authResponse.user } },
    ]

    return store
      .dispatch(getUserData())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  })
  //SET_USER TESTS
  test('Should created SET_USER_REQUEST action', () => {
    const expectedAction = {
      type: SET_USER_REQUEST
    };

    expect(setUserRequestAction()).toEqual(expectedAction)
  })

  test('Should return state with setUserRequest: true', () => {
    const action = setUserRequestAction();
    const expectedState = { ...initialState, setUserRequest: true };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

  test('Should created SET_USER_FAILED action', () => {
    const expectedAction = {
      type: SET_USER_FAILED
    };

    expect(setUserFailedAction()).toEqual(expectedAction)
  })

  test('Should return state with setUserFailed: true, setUserRequest: false', () => {
    const action = setUserFailedAction();
    const expectedState = { ...initialState, setUserFailed: true, setUserRequest: false };

    expect(reducer({ ...initialState, setUserRequest: true }, action)).toEqual(expectedState);
  })

  test('Should created SET_USER_SUCCESS action with user data from response in payload', () => {
    const expectedAction = {
      type: SET_USER_SUCCESS,
      payload: { ...authResponse.user }
    };

    expect(setUserSuccessAction(authResponse.user)).toEqual(expectedAction);
  })

  test('Should return state with user data from response after setUserSuccessAction', () => {
    const action = setUserSuccessAction(authResponse.user);
    const expectedState = { ...initialState, ...authResponse.user };

    expect(reducer({ ...initialState, setUserRequest: true }, action)).toEqual(expectedState);
  })

  test('Should fired 2 actions after setUserData is dispatching', () => {
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    const store = mockStore(initialState);

    const expectedActions = [
      { type: SET_USER_REQUEST },
      { type: SET_USER_SUCCESS, payload: { ...authResponse.user } },
    ]

    return store
      .dispatch(setUserData(name, email, pass))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  })
})