import { useSelector } from "react-redux";
import { RootState } from "../stores";

export const useArtist = () => {
  const { loading, artist } = useSelector((state: RootState) => state.manageArtist);
  return { loading, artist };
};
