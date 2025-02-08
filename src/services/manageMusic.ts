import { apiPrivateInstance } from "../constants/privateAPI";
import { apiInstance } from "../constants/publicAPI";

export const manageMusic = {
  searchMusic: (req: string) =>
    apiInstance().get(`music/get-all?name=${req}`),
};
