import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AppDispatch } from "../../redux/store";
import {
  userPlaylistThunk,
  addToPlaylistThunk,
  createPlaylistThunk
} from "../../stores/playlistManager/thunk";
import { getMusic } from "../../types/music";
import { usePlaylist } from "../../hooks/usePlaylist";
import { useUser } from "../../hooks/useUser";

interface AddToPlaylistProps {
  onClose: (shouldAdd?: boolean) => void;
  music: getMusic | null;
}

const AddToPlaylist: React.FC<AddToPlaylistProps> = ({ onClose, music }) => {
  const [animate, setAnimate] = useState(false);
  const [isSelected, setIsSelected] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { loading, userPlaylist } = usePlaylist();
  const { userInfo } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
    dispatch(userPlaylistThunk());
  }, [dispatch]);

  const handleClose = () => {
    setAnimate(false);
    onClose(false);
    setIsSelected("");
    setSelectedPlaylist("");
  };

  const handleSelected = (playlistId: string, playlistTitle: string) => {
    setIsSelected(playlistId);
    setSelectedPlaylist(playlistTitle);
  };

  const handleAdd = async () => {
    if (!userInfo || !isSelected || !music?.id) return;
    const addData = { playlistId: isSelected, musicId: music.id };
    await dispatch(addToPlaylistThunk(addData));
    onClose(true);
  };

  const handleCreate = async () => {
    await dispatch(createPlaylistThunk);
    await dispatch(userPlaylistThunk());
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={handleClose}
    >
      <div
        className={`bg-[#1e1e1e] h-[80%] w-[50%] rounded-xl transform transition-transform duration-200 ${
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

        <div className="flex flex-col h-full">
          <div className="px-4 py-4">
            <p className="text-xl font-bold">{t("addToPlaylist.title")}</p>
            {music && (
              <p className="mt-4 text-lg">
                {t("addToPlaylist.description")}{" "}
                <strong>"{music.musicName}"</strong>?
              </p>
            )}
          </div>

          <div className="px-4 py-4 flex-grow overflow-y-auto custom-scrollbar">
            {userPlaylist && userPlaylist.playlists.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {userPlaylist.playlists.map((playlist) => (
                  <div
                    key={playlist.playlistId}
                    className={`flex items-center gap-4 p-4 rounded-lg shadow-lg transition cursor-pointer ${
                      isSelected === playlist.playlistId
                        ? "bg-gray-700"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                    onClick={() =>
                      handleSelected(playlist.playlistId, playlist.title)
                    }
                  >
                    <img
                      src={playlist.backgroundImage}
                      alt={playlist.title}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="text-white text-lg font-medium">
                        {playlist.title}
                      </h3>
                    </div>
                    <div
                      className="bg-[#292929] ml-auto hover:bg-green-500 hover:text-black cursor-pointer duration-200 transform hover:scale-105 px-2 py-2 flex justify-center items-center h-10 w-10 rounded-full"
                      onClick={() =>
                        navigate(`/playlist/${playlist.playlistId}`)
                      }
                    >
                      <i className="fa-solid fa-chevron-right text-xl"></i>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center mt-10">
                <p className="font-bold text-lg">
                  {t("playlistDetail.emptyOwner")}
                </p>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 hover:scale-105 duration-200 max-w-[50%] transform flex justify-center items-center shadow-md mt-4" onClick={handleCreate}>
                  <p className="text-base font-semibold">
                    {t("playlistDetail.createNew")}
                  </p>
                </button>
              </div>
            )}
          </div>

          <div className="px-4 py-4 flex justify-between">
            {selectedPlaylist ? (
              <div>
                {t("addToPlaylist.choose")}{" "}
                <strong>"{selectedPlaylist}"</strong>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex space-x-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 duration-200"
                onClick={handleClose}
              >
                {t("addToPlaylist.cancel")}
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 duration-200"
                onClick={handleAdd}
              >
                {loading ? (
                  <Spin
                    indicator={<LoadingOutlined spin className="text-white" />}
                  />
                ) : (
                  t("addToPlaylist.add")
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylist;
