import { useSelector } from "react-redux";
import { RootState } from "../stores";

export const useUser = () => {
  const { userInfo, loading } = useSelector(
    (state: RootState) => state.manageUser
  );
  return { userInfo, loading };
};
