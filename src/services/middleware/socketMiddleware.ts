import type { Middleware, MiddlewareAPI } from 'redux';
import type { TWSActions } from '../actions/web-socket'
import type { AppDispatch, RootState } from '../../utils/types';

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {

  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    const {
      wsStart,
      onOpen,
      onClose,
      onError,
      wsGetMessage,
      wsSendMessage,
    } = wsActions;
    let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === wsStart().type) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(onOpen(event));
        };

        socket.onerror = event => {
          dispatch(onError(event));
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch(wsGetMessage(data));
        };

        socket.onclose = event => {
          socket?.close();
          socket = null;
          dispatch(onClose(event));
        };

        if (type === wsSendMessage().type) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
}; 