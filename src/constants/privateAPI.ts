import axios, { AxiosInstance } from "axios";
import config from "./config.json";

export const apiPrivateInstance = (): AxiosInstance => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : "";

  const api = axios.create({
    baseURL: config.baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return api;
};
