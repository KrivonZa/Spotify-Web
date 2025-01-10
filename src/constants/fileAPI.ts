import axios, { AxiosInstance } from "axios";

export const apiInstance = (baseURL: string, getToken: () => string): AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();
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
