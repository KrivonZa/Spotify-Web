import { apiPrivateInstance } from "../constants/privateAPI";

export const manageUser = {
  userInfo: () => apiPrivateInstance().get(`user`),
};
