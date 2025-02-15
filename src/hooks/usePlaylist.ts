import { useSelector } from "react-redux";
import { RootState } from "../stores";

export const usePlaylist = () => {
  const { userPlaylist, playlistDetail, loading, allPlaylist, artistPlaylist } =
    useSelector((state: RootState) => state.managePlaylist);
  return { userPlaylist, playlistDetail, loading, allPlaylist, artistPlaylist };
};
