import { getTokenOfLocalStorage, hasExpiredToken } from "../api/token";

export async function authFetch(url, params, logout) {
  const token = getTokenOfLocalStorage();

  if (!token) {
    //The user isn't logged in
    logout();
  } else {
    if (hasExpiredToken(token)) {
      //Token expired
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await fetch(url, paramsTemp);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }
}
