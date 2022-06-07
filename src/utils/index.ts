import { authResponse } from './types'

export interface CookieAttributes {
  path?: string
  domain?: string
  expires?: number | Date | string
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None'
  secure?: boolean
  [property: string]: any
}

export function setCookie(name: string, value: string, props: CookieAttributes) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 });
}

export function saveTokens(response: authResponse) {
  setCookie('accessToken', response.accessToken.split('Bearer ')[1], { expires: 1200 });
  window.localStorage.setItem('refreshToken', response.refreshToken);
}

export function deleteTokens() {
  deleteCookie('accessToken');
  window.localStorage.removeItem('refreshToken');
}

export function addZero(val: number):string {
  return val < 10? "0" + val:String(val)
}