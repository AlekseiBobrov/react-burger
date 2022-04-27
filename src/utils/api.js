const API_URL = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
      }
    }
  )
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data.message;
      return Promise.reject(data);
    })
} 