import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

export function ForgotPass() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div className="">
      <h1 className="">ForgotPass</h1>
    </div>
  );
}
