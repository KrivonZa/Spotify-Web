import { useSelector } from "react-redux";
import { RootState } from "../stores";

export const useArtist = () => {
  const { loading, searchArtist, getAllArtist } = useSelector((state: RootState) => state.manageArtist);
  return { loading, searchArtist, getAllArtist };
};
