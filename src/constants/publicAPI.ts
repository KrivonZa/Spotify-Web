import axios, { AxiosInstance } from "axios";
import config from "./config.json"

export const apiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: config.baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return api;
};
