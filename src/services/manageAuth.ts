import { apiInstance } from "../constants/publicAPI";
import { signup, login } from "../types/auth";

export const manageAuth = {
  checkEmail: (req: string) => apiInstance().post(`auth/checkEmail`, req),
  signup: (req: signup) => apiInstance().post(`auth/signup`, req),
  login: (req: login) => apiInstance().post(`auth/login`, req),
};
