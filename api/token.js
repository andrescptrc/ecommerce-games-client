import { TOKEN } from "../utils/constants";

export function setTokenToLocalStorage(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenOfLocalStorage() {
  return localStorage.getItem(TOKEN);
}
