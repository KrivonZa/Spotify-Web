import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { uploadImageThunk } from "../../stores/fileManager/thunk";
import { updateInfo2Thunk } from "../../stores/userManager/thunk";
import { useFile } from "../../hooks/useFile";

interface UploadMusicProps {
  onClose: () => void;
  userInfo: any;
}

const UploadMusic: React.FC<UploadMusicProps> = ({ onClose, userInfo }) => {
  const [animate, setAnimate] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState(userInfo.nickName);
  const [selectedImage, setSelectedImage] = useState(userInfo.avatar);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    console.log("Ok");
  };

  const handleClose = () => {
    setAnimate(false);
    onClose();
  };

  const handleSave = async () => {
    if (imageFile) {
      try {
        const result = await dispatch(uploadImageThunk({ file: imageFile }));
        if (result) {
          const avatar = result.payload.url;
          await dispatch(updateInfo2Thunk({ name, avatar }));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      if (selectedImage) {
        if (name && userInfo) {
          await dispatch(updateInfo2Thunk({ name, avatar: userInfo.avatar }));
        }
      } else {
        await dispatch(updateInfo2Thunk({ name, avatar: "" }));
      }
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={handleClose}
    >
      <div
        className={`px-5 py-3 bg-[#1e1e1e] min-h-[25%] w-[40%] rounded-xl transform transition-transform duration-200 ${
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

        <p className="text-xl font-bold py-5">{t("updateProfile.detail")}</p>

        <div className="flex items-center mb-5">
          <div
            className="relative w-72 h-48 group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={
                selectedImage ||
                "https://media.istockphoto.com/id/1305665241/vector/anonymous-gender-neutral-face-avatar-incognito-head-silhouette-stock-illustration.jpg?s=612x612&w=0&k=20&c=qA6GUTalFyrBCRVUzQgp2B5zODxmOA4NXTBcw9notYY="
              }
              className="w-48 h-48 rounded-full object-cover shadow-xl"
              alt="Avatar"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
              <p className="hover:underline duration-100 text-lg">
                {t("profile.choose")}
              </p>
              <i className="fa-solid fa-pen text-2xl"></i>
              <p
                className="hover:underline duration-100 text-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
              >
                {t("profile.remove")}
              </p>
            </div>
            {/* Input file ẩn */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="w-full pl-8">
            <p className="font-bold mb-1">{t("updateProfile.name")}</p>
            <div className="flex flex-col items-end">
              <div
                className={`border border-gray-500 rounded-lg mt-2 hover:bg-[#414141] duration-150 w-full ${
                  isFocused ? "border-white bg-[#414141]" : "border-[#141414]"
                }`}
              >
                <input
                  type="text"
                  placeholder={userInfo.nickName}
                  className="bg-transparent focus:outline-none px-3 py-1 placeholder-[#a0a0a0]"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button
                className="text-center text-[#121212] font-bold bg-white hover:bg-slate-200 transform hover:scale-105 duration-200 py-3 px-10 rounded-full mt-2"
                onClick={handleSave}
              >
                {t("updateProfile.save")}
              </button>
            </div>
          </div>
        </div>
        <p className="font-semibold text-xs">{t("updateProfile.policy")}</p>
      </div>
    </div>
  );
};

export default UploadMusic;
