import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { addMusicThunk, getMusicByUserThunk } from "../../stores/musicManager/thunk";
import { useMusic } from "../../hooks/useMusic";
import { useUser } from "../../hooks/useUser";

interface UploadMusicProps {
  onClose: () => void;
}

const UploadMusic: React.FC<UploadMusicProps> = ({ onClose }) => {
  const [animate, setAnimate] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [musicName, setMusicName] = useState("");
  const fileInputImageRef = useRef<HTMLInputElement>(null);
  const fileInputAudioRef = useRef<HTMLInputElement>(null);
  const { userInfo } = useUser();
  const { loading } = useMusic();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      e.target.value = "";
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAudioFile(file);
      const audioUrl = URL.createObjectURL(file);
      setAudioPreview(audioUrl);
      e.target.value = "";
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputImageRef.current) {
      fileInputImageRef.current.value = "";
    }
  };

  const handleRemoveAudio = () => {
    setAudioFile(null);
    setAudioPreview(null);
    if (fileInputAudioRef.current) {
      fileInputAudioRef.current.value = "";
    }
  };

  const handleClose = () => {
    setAnimate(false);
    onClose();
  };

  const handleSave = async () => {
    if (!imageFile || !audioFile || !musicName || !userInfo) return;
    try {
      const fileData = {
        thumbnail: imageFile,
        musicUrl: audioFile,
      };
      await dispatch(addMusicThunk({ req: musicName, file: fileData }));
      await dispatch(getMusicByUserThunk(userInfo.id));
      onClose();
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={handleClose}
    >
      <div
        className={`px-5 py-3 bg-[#1e1e1e] min-h-[30%] w-[40%] rounded-xl transform transition-transform duration-200 ${
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

        <p className="text-xl font-bold py-5">{t("addMusic.title")}</p>

        <div className="flex items-center mb-5">
          <div
            className="relative w-72 h-48 group"
            onClick={() => fileInputImageRef.current?.click()}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                className="w-48 h-48 rounded-md object-cover shadow-xl"
                alt="Avatar"
              />
            ) : (
              <div className="h-48 w-48 rounded-md flex justify-center items-center bg-[#242424]">
                <i className="fa-solid text-3xl fa-music text-gray-400"></i>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md">
              <p className="hover:underline duration-100 text-lg">
                {t("addMusic.choose")}
              </p>
              <i className="fa-solid fa-pen text-2xl"></i>
              <p
                className="hover:underline duration-100 text-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
              >
                {t("addMusic.remove")}
              </p>
            </div>
            <input
              ref={fileInputImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="w-full pl-8">
            <p className="font-bold mb-1">{t("addMusic.name")}</p>
            <input
              type="text"
              placeholder={t("addMusic.name")}
              className="bg-transparent border border-gray-500 rounded-lg px-3 py-1 placeholder-[#a0a0a0] w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={musicName}
              onChange={(e) => setMusicName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-5">
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputAudioRef.current?.click()}
          >
            <button className="bg-[#414141] text-white px-4 py-2 rounded-lg duration-200 hover:bg-[#707070]">
              {t("addMusic.chooseAudio")}
            </button>
            <input
              ref={fileInputAudioRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleAudioChange}
            />
          </div>
          {audioPreview && (
            <div className="my-4">
              <audio controls src={audioPreview} className="w-full">
                {t("addMusic.notSupported")}
              </audio>
              <div className="flex justify-end items-center">
                <button
                  className="text-red-500 mt-2"
                  onClick={handleRemoveAudio}
                >
                  {t("addMusic.removeAudio")}
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          className="text-center w-full text-[#121212] font-bold bg-green-500 hover:bg-green-600 transform hover:scale-105 duration-200 py-3 px-10 rounded-full mt-2"
          onClick={handleSave}
        >
          {loading ? (
            <Spin indicator={<LoadingOutlined spin className="text-white" />} />
          ) : (
            t("addMusic.upload")
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadMusic;
