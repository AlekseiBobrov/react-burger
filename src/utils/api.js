import { getCookie, saveTokens } from ".";
const API_URL = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
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

export const fetchWithRefresh = async (url, options) => {
  try {
    if (options.headers.authorization === undefined) throw new Error("jwt expired");
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch(err) {
    if (err.message === "jwt expired"){
      const refreshData = await refreshToken();
      saveTokens(refreshData);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
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

export const getOrderRequest = (ingredients) => {
  return fetch(
    `${API_URL}/orders`,
    {
      method: 'POST',
      body: JSON.stringify({ "ingredients": ingredients }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
  )
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data.order.number;
      return Promise.reject(data);
    })
}

export const resetPasswordRequest = (email) => {
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

export const updatePasswordRequest = (password, token) => {
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

export const registerRequest = (email, password, name) => {
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

export const loginRequest = (email, password) => {
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
        authorization: accessToken?('Bearer ' + accessToken):accessToken,
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
  )
  .then(data => {
    if (data?.success) return data.user;
    return Promise.reject(data);
  })
}

export const setUserDataRequest = (name, email, password) => {
  const accessToken = getCookie('accessToken');
  let user = { name: name, email: email }
  if (password) user = {...user, password: password};

  return fetchWithRefresh(
    `${API_URL}/auth/user`,
    {
      method: 'PATCH',
      headers: {
        authorization: accessToken?('Bearer ' + accessToken):accessToken,
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
