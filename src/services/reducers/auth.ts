import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../actions/auth';


interface authActionType {
  type: string,
}

interface authStateType {
    registerRequest: boolean,
    registerFailed: boolean,
  }

const initialState = {
  registerRequest: false,
  registerFailed: false,
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
    default: {
      return state;
    }
  }
};