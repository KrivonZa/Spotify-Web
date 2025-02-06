import { apiPrivateInstance } from "../constants/privateAPI";
import { apiInstance } from "../constants/publicAPI"

export const managePlaylist = {
  getUserPlaylist: () => apiPrivateInstance().get(`playlist`),
  createPlaylist: () => apiPrivateInstance().post(`playlist/create`),
  deletePlaylist: (req: string) =>
    apiPrivateInstance().delete(
      `playlist/delete/{playlistId}?playlistId=${req}`
    ),
  getPlaylistDetail: (req:string) => apiPrivateInstance().get(`/playlist/{playlistId}?playlistId=${req}`),
};
