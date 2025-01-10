import { useSelector } from "react-redux";
import { RootState } from "../stores";

export const useAuth = () => {
  const { checkEmail, loading } = useSelector((state: RootState) => state.manageAuth);
  return { checkEmail, loading };
};
