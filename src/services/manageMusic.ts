import { apiPrivateInstance } from "../constants/privateAPI";
import { apiInstance } from "../constants/publicAPI";
import { apiFileInstance } from "../constants/fileAPI";
import { bothFile } from "../types/file";

export const manageMusic = {
  searchMusic: (req: string) => apiInstance().get(`music/get-all?name=${req}`),
  getMusicByUser: (req: string) =>
    apiPrivateInstance().get(`/music/get-by-artist/{userId}?userId=${req}`),
  deleteMusic: (req: string) =>
    apiPrivateInstance().delete(`/music/delete-music/${req}`),
  addMusic: (file: bothFile, req: string) => {
    const formData = new FormData();
    formData.append("thumbnail", file.thumbnail);
    formData.append("musicUrl", file.musicUrl);
    return apiFileInstance().post(
      `/music/add-music?musicName=${req}`,
      formData
    );
  },
};
