import axios, { AxiosInstance } from "axios";
import config from "./config.json";

export const apiPrivateInstance = (token: string): AxiosInstance => {
  const api = axios.create({
    baseURL: config.baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return api;
};
