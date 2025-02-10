import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AppDispatch } from "../../redux/store";
import { useUser } from "../../hooks/useUser";
import { usePlaylist } from "../../hooks/usePlaylist";
import {
  createPlaylistThunk,
  userPlaylistThunk,
  updatePlaylistThunk,
} from "../../stores/playlistManager/thunk";
import { uploadImageThunk } from "../../stores/fileManager/thunk";

interface CreatePlaylistProps {
  onClose: (shouldDelete?: boolean) => void;
}

const CreatePlaylist: React.FC<CreatePlaylistProps> = ({ onClose }) => {
  const [animate, setAnimate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { userInfo } = useUser();
  const { loading } = usePlaylist();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    onClose(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!userInfo) return;
    const createdPlaylist = await dispatch(createPlaylistThunk()).unwrap();
    if (!createdPlaylist?.playlistId) {
      onClose(false);
      return;
    }

    let avatar = null;
    if (image) {
      try {
        const result = await dispatch(uploadImageThunk({ file: image }));
        if (result) {
          avatar = result.payload.url;
          console.log("Avatar URL:", avatar);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const data = {
      playlistId: createdPlaylist.playlistId,
      title: title,
      description: description,
      backgroundImage: avatar,
    };
    await dispatch(updatePlaylistThunk(data));
    await dispatch(userPlaylistThunk());
    onClose(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={handleClose}
    >
      <div
        className={`bg-[#1e1e1e] min-h-[20%] w-[80%] rounded-xl transform transition-transform duration-200 ${
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
          <p className="text-xl font-bold mb-4">{t("createPlaylist.title")}</p>
          <p className="mt-4 text-lg">{t("createPlaylist.description")}</p>
          <div className="my-5">
            <div className="mb-4">
              <label
                className="block font-semibold text-white mb-2"
                htmlFor="title"
              >
                {t("createPlaylist.name")}
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded-md bg-[#414141] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t("createPlaylist.name")}
              />
            </div>

            <div className="mb-4">
              <label
                className="block font-semibold text-white mb-2"
                htmlFor="description"
              >
                {t("createPlaylist.about")}
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded-md bg-[#414141] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t("createPlaylist.about")}
                rows={4}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                className="block font-semibold text-white mb-2"
                htmlFor="image"
              >
                {t("createPlaylist.image")}
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[#414141] file:text-white hover:file:bg-gray-600 file:duration-200 cursor-pointer file:cursor-pointer"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-md"
                />
              )}
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex space-x-4">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 duration-200"
              onClick={handleClose}
            >
              {t("createPlaylist.cancel")}
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 duration-200"
              onClick={handleSubmit}
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined spin className="text-white" />}
                />
              ) : (
                t("createPlaylist.create")
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;
