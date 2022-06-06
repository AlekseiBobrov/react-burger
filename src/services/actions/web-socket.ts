import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from '../constants';

interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: any;
}

interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: any;
}

interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload?: any;
}

interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly payload: any;
}

interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any;
}

interface IWSSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: any;
}

export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionSuccess
    | IWSConnectionError
    | IWSConnectionClosed
    | IWSGetMessage
    | IWSSendMessage;

export const wsConnectionStart = (payload: any): IWSConnectionStart => ({
    type: WS_CONNECTION_START,
    payload
})

export const wsConnectionSuccess = (payload: any): IWSConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS,
    payload
})

export const wsConnectionError = (payload?: any): IWSConnectionError => ({
    type: WS_CONNECTION_ERROR,
    payload
})

export const wsConnectionClosed = (payload?: any): IWSConnectionClosed => ({
    type: WS_CONNECTION_CLOSED,
    payload
})


export const wsGetMessage = (payload: any): IWSGetMessage => ({
    type: WS_GET_MESSAGE,
    payload
})

export const wsSendMessage = (payload: any): IWSSendMessage => ({
    type: WS_SEND_MESSAGE,
    payload
})