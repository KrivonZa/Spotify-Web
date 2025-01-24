import axios, { AxiosInstance } from "axios";
import config from "./config.json";

export const apiFileInstance = (): AxiosInstance => {
  const user = localStorage.getItem("user");
  const api = axios.create({
    baseURL: config.baseUrl,
  });

  api.interceptors.request.use(
    (config) => {
      const token = user ? JSON.parse(user).token : "";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};
