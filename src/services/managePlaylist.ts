import { apiPrivateInstance } from "../constants/privateAPI";
import { apiInstance } from "../constants/publicAPI";
import { addToPlaylist, updatePlaylist } from "../types/playlist";

export const managePlaylist = {
  getUserPlaylist: () => apiPrivateInstance().get(`playlist`),
  createPlaylist: () => apiPrivateInstance().post(`playlist/create`),
  deletePlaylist: (req: string) =>
    apiPrivateInstance().delete(
      `playlist/delete/{playlistId}?playlistId=${req}`
    ),
  getPlaylistDetail: (req: string) =>
    apiInstance().get(`/playlist/detail/{playlistId}?playlistId=${req}`),
  getAllPlaylist: () => apiInstance().get(`/playlist/get-all`),
  addMusicToPlaylist: (req: addToPlaylist) =>
    apiPrivateInstance().post(`/playlist/add-song`, req),
  updatePlaylist: (req: updatePlaylist) =>
    apiPrivateInstance().patch(`/playlist/update`, req),
  getPlaylistByArtist: (req: string) =>
    apiPrivateInstance().get(`/playlist/get-all/{userId}?userId=${req}`),
  removeFromPlaylist: (req: addToPlaylist) =>
    apiPrivateInstance().delete(`/playlist/remove-song`, { data: req }),
};
