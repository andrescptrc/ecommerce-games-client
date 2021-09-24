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

export async function deletedAddressesApi(idAddresses, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddresses}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await authFetch(url, params, logout);
    if (res.statusCode === 500) throw "Server error";
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateAddressApi(idAddress, address, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "PUT",
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
