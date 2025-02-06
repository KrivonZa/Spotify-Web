import { useSelector } from "react-redux";
import { RootState } from "../stores";

export const usePlaylist = () => {
  const { userPlaylist, playlistDetail, loading } = useSelector(
    (state: RootState) => state.managePlaylist
  );
  return { userPlaylist, playlistDetail, loading };
};
