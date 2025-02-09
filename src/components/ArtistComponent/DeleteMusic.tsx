import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AppDispatch } from "../../redux/store";
import {
  deleteMusicThunk,
  getMusicByUserThunk,
} from "../../stores/musicManager/thunk";
import { getMusic } from "../../types/music";
import { useMusic } from "../../hooks/useMusic";
import { useUser } from "../../hooks/useUser";

interface DeleteMusicProps {
  onClose: (shouldDelete?: boolean) => void;
  music: getMusic | null;
}

const DeleteMusic: React.FC<DeleteMusicProps> = ({ onClose, music }) => {
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { loading } = useMusic();
  const { userInfo } = useUser();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    onClose(false);
  };

  const handleDelete = async () => {
    if (!music || !userInfo) return;
    await dispatch(deleteMusicThunk(music.id));
    await dispatch(getMusicByUserThunk(userInfo.id));
    onClose(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={handleClose}
    >
      <div
        className={`bg-[#1e1e1e] min-h-[20%] w-[40%] rounded-xl transform transition-transform duration-200 ${
          animate ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="cursor-pointer absolute top-5 right-4 rounded-full bg-[#414141] hover:bg-[#707070] duration-200 w-9 h-9 flex items-center justify-center"
          onClick={handleClose}
        >
          <i className="fa-solid fa-x text-white"></i>
        </div>

        <div className="px-4 py-4">
          <p className="text-xl font-bold">{t("deleteMusic.title")}</p>
          {music && (
            <p className="mt-4 text-lg">
              {t("deleteMusic.description")}{" "}
              <strong>"{music.musicName}"</strong>?
            </p>
          )}
          <div className="absolute bottom-4 right-4 flex space-x-4">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 duration-200"
              onClick={handleClose}
            >
              {t("deleteMusic.cancel")}
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 duration-200"
              onClick={handleDelete}
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined spin className="text-white" />}
                />
              ) : (
                t("deleteMusic.delete")
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMusic;
