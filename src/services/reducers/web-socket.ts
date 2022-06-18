import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../constants';
import type { TWSActions } from '../actions'
import type { IWSState } from '../../utils/types';

export const initialState: IWSState = {
  wsConnected: false,
  messages: []
};

// Создадим редьюсер для WebSocket
export const wsReducer = (state = initialState, action: TWSActions): IWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
        messages: [],
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        messages: [],
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};