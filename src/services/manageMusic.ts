import { apiPrivateInstance } from "../constants/privateAPI";
import { apiInstance } from "../constants/publicAPI";
export const manageMusic = {
  searchMusic: (req: string) => apiInstance().get(`music/get-all?name=${req}`),
  getMusicByUser: (req: string) =>
    apiPrivateInstance().get(`/music/get-by-artist/{userId}?userId=${req}`),
  deleteMusic: (req: string) =>
    apiPrivateInstance().delete(`/music/delete-music/${req}`),
};
