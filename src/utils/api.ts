import { getCookie, saveTokens } from ".";

import { IngredientShape } from "./types";

type HeadersType = HeadersInit & { authorization?: string }

interface OptionsType extends RequestInit {
  headers: HeadersType
}

const API_URL = "https://norma.nomoreparties.space/api"

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const refreshToken = () => {
  const token = window.localStorage.getItem('refreshToken');
  return fetch(
    `${API_URL}/auth/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token: token})
    }
  )
  .then(checkResponse)
}

export const fetchWithRefresh = async (url: string, options: OptionsType) => {
  try {
    if (options.headers?.authorization === undefined) throw new Error("jwt expired");
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch(err) {
    if(err instanceof Error) {
      if (err.message === "jwt expired"){
        const refreshData = await refreshToken();
        saveTokens(refreshData);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
      }
    } else {
      return Promise.reject(err)
    }
  }
}

export const getIngredientsRequest = () => {
  return fetch(`${API_URL}/ingredients`)
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    })
}

export const getOrderRequest = (ingredients: IngredientShape[]) => {
  const accessToken = getCookie('accessToken');

  return fetchWithRefresh(
    `${API_URL}/orders`,
    {
      method: 'POST',
      body: JSON.stringify({ "ingredients": ingredients }),
      headers: {
        authorization: (accessToken && 'Bearer ' + accessToken) as string,
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
  )
  .then(data => {
    if (data?.success) return data.order.number;
    return Promise.reject(data);
  })
}

export const resetPasswordRequest = (email:string) => {
  return fetch(
    `${API_URL}/password-reset`,
    {
      method: 'POST',
      body: JSON.stringify({ "email": email }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
  )
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data.message;
      return Promise.reject(data);
    })
}

export const updatePasswordRequest = (password:string, token:string) => {
  return fetch(
    `${API_URL}/password-reset/reset`,
    {
      method: 'POST',
      body: JSON.stringify({ password: password, token: token }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
  )
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data.message;
      return Promise.reject(data);
    })
}

export const registerRequest = (email:string, password:string, name:string) => {
  return fetch(
    `${API_URL}/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({email:email, password: password, name: name }),
    }
  )
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data;
      return Promise.reject(data);
    })
}

export const loginRequest = (email:string, password:string) => {
  return fetch(
    `${API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({email:email, password: password}),
    }
  )
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data;
      return Promise.reject(data);
    })
} 

export const logoutRequest = () => {
  const token =  window.localStorage.getItem('refreshToken');
  return fetch(
    `${API_URL}/auth/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token: token}),
    }
  )
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data.message;
      return Promise.reject(data);
    })
}

export const getUserDataRequest = () => {
  const accessToken = getCookie('accessToken');

  return fetchWithRefresh(
    `${API_URL}/auth/user`,
    {
      method: 'GET',
      headers: {
        authorization: (accessToken && 'Bearer ' + accessToken) as string,
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
  )
  .then(data => {
    if (data?.success) return data.user;
    return Promise.reject(data);
  })
}

export const setUserDataRequest = (name:string, email:string, password:string) => {
  const accessToken = getCookie('accessToken');
  let user = {
    name: name,
    email: email,
    ...(password && { password: password })
  }
  console.log('setUserDataRequest user:', user)
  return fetchWithRefresh(
    `${API_URL}/auth/user`,
    {
      method: 'PATCH',
      headers: {
        authorization: (accessToken && 'Bearer ' + accessToken) as string,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    }
  )
  .then(data => {
    if (data?.success) return data.user;
    return Promise.reject(data);
  })
}