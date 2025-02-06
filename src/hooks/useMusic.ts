import { useSelector } from "react-redux";
import { RootState } from "../stores";

export const useMusic = () => {
  const { loading, music } = useSelector((state: RootState) => state.manageMusic);
  return { loading, music };
};
