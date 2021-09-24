import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function createAddressApi(address, logout) {
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const res = await authFetch(url, params, logout);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAddressesApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/addresses?user=${idUser}`;
    const res = await authFetch(url, null, logout);
    if (res.statusCode === 500) throw "Server error";
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}
