import jwtDecode from "jwt-decode";

import { TOKEN } from "../utils/constants";

export function setTokenToLocalStorage(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenOfLocalStorage() {
  return localStorage.getItem(TOKEN);
}

export function removeTokenOfLocalStorage() {
  localStorage.removeItem(TOKEN);
}

export function hasExpiredToken(token) {
  const tokenDecode = jwtDecode(token);
  const expireDate = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();

  if (currentDate > expireDate) {
    return true;
  }

  return false;
}
