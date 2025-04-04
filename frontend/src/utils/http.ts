import { BASE_API_URL } from "./constant";

import axios from "axios";

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const http = {
  fetcher: async (url: string) => {
    const uri = `${BASE_API_URL}${url}`;
    const resp = await instance.get(uri);

    return resp.data;
  },
};
