import { BASE_PATH } from "../utils/constants";

export async function getPlatformsApi() {
  try {
    const url = `${BASE_PATH}/platforms?_sort=position:asc`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
