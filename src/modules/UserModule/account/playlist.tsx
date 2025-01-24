import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";

export function Playlist() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-[#121212] w-full h-full flex justify-center">
      <div className="my-20 mx-28 w-[50%] flex flex-col gap-y-5"></div>
    </div>
  );
}
