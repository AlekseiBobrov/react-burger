import type { Middleware, MiddlewareAPI } from 'redux';
import type { TWSActions } from '../actions/web-socket'
import {
  WS_CONNECTION_START,
  WS_SEND_MESSAGE,
} from '../constants';

import {
  wsConnectionSuccess,
  wsConnectionError,
  wsGetMessage,
  wsConnectionClosed,
} from '../actions/web-socket'
import type { AppDispatch, RootState } from '../../utils/types';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch( wsConnectionSuccess(event) );
        };

        socket.onerror = event => {
          dispatch(wsConnectionError(event));
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch(wsGetMessage(data));
        };

        socket.onclose = event => {
          socket?.close();
          socket = null;
          dispatch(wsConnectionClosed(event));
        };

        if (type === WS_SEND_MESSAGE) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
}; 