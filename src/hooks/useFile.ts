import { useSelector } from "react-redux";
import { RootState } from "../stores";

export const useFile = () => {
  const { dataImageFile, loading } = useSelector(
    (state: RootState) => state.manageFile
  );
  return { dataImageFile, loading };
};
