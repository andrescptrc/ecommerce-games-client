import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function registerApi(formData) {
  try {
    const url = `${BASE_PATH}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const resp = await fetch(url, params);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loginApi(formData) {
  try {
    const url = `${BASE_PATH}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const resp = await fetch(url, params);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetPasswordApi(email) {
  try {
    const url = `${BASE_PATH}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };

    const res = await fetch(url, params);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMeApi(logout) {
  try {
    const url = `${BASE_PATH}/users/me`;
    const res = await authFetch(url, null, logout);
    return res ? res : null;
  } catch (error) {
    return null;
  }
}

export async function updateNameApi(idUser, data, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const res = await authFetch(url, params, logout);
    return res ? res : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateEmailApi(idUser, email, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const res = await authFetch(url, params, logout);
    return res ? res : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updatePasswordApi(idUser, password, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };

    const res = await authFetch(url, params, logout);
    return res ? res : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
