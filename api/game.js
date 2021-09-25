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
