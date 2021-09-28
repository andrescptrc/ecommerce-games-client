import { BASE_PATH } from "../utils/constants";

export async function getLastGamesApi(limit) {
  try {
    const limitItem = `_limit=${limit}`;
    const sortItem = `_sort=createdAt:desc`;
    const url = `${BASE_PATH}/games?${limitItem}&${sortItem}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getGamesPlatformApi(platform, limit, start) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `_sort=createdAt:desc`;
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
