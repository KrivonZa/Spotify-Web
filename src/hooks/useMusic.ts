import { useSelector } from "react-redux";
import { RootState } from "../stores";

export const useMusic = () => {
  const { loading, searchMusic, artistMusic } = useSelector((state: RootState) => state.manageMusic);
  return { loading, searchMusic, artistMusic };
};
