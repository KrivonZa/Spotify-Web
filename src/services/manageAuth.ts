import { apiInstance } from "../constants/publicAPI";
import {
  signup,
  login,
  forgetConfirm,
  resetPassword,
  changePassword,
} from "../types/auth";

export const manageAuth = {
  checkEmail: (req: string) => apiInstance().post(`auth/checkEmail`, req),
  signup: (req: signup) => apiInstance().post(`auth/signup`, req),
  login: (req: login) => apiInstance().post(`auth/login`, req),
  forget: (req: string) => apiInstance().post(`auth/forget?email=${req}`),
  forgetConfirm: (req: forgetConfirm) =>
    apiInstance().post(
      `auth/forget-confirm?email=${req.email}&code=${req.code}`
    ),
  reset: (req: resetPassword) =>
    apiInstance().post(
      `auth/reset?email=${req.email}&newPassword=${req.newPassword}`
    ),
  change: (req: changePassword) =>
    apiInstance().post(
      `auth/change-password?email=${req.email}&password=${req.password}&newPassword=${req.newPassword}`
    ),
};
