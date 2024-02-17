import Axios from "axios";
import type { AxiosResponse } from "axios";

const axios = Axios.create({
  baseURL: "/api",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  //withXSRFToken: true
});

function unwrap<T>(response: AxiosResponse<any, any>): AxiosResponse<T, any> {
  if (response?.data?.data) {
    response.data = response.data.data as T;
  }
  return response;
}

const handle = (error: any) => {
  if (error.response) {
    const data = error.response.data;
    if (data?.data?.message) {
      error.message = data?.data?.message;
      error.response.data = data?.data;
    } else if (data?.message) {
      error.message = data?.message;
    }
  }
  throw error;
};

async function post<T>(
  url: string,
  data?: any,
): Promise<AxiosResponse<T, any>> {
  return await axios
    .post(url, data)
    .then(unwrap<T>)
    .catch(handle);
}

async function get<T>(url: string): Promise<AxiosResponse<T, any>> {
  return await axios
    .get(url)
    .then(unwrap<T>)
    .catch(handle);
}

export const api = {
  post,
  get,
};
