import { apiPrivateInstance } from "../constants/privateAPI";
import { apiInstance } from "../constants/publicAPI";

export const manageMusic = {
  getAllMusic: (req: string) =>
    apiInstance().get(`music/get-all?name=${req}`),
};
