import { apiPrivateInstance } from "../constants/privateAPI";
import { editProfile1, editProfile2 } from "../types/user";

export const manageUser = {
  userInfo: () => apiPrivateInstance().get(`user`),
  update1: (req: editProfile1) => apiPrivateInstance().post(`user/update`, req),
  update2: (req: editProfile2) =>
    apiPrivateInstance().post(`/user/updateAccount`, req),
};
