import { BASE_PATH } from "../utils/constants";

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
