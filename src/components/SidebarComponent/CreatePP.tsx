import "../../layouts/UserLayout/styles.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../stores";
import {
  createPlaylistThunk,
  userPlaylistThunk,
} from "../../stores/playlistManager/thunk";
import { usePlaylist } from "../../hooks/usePlaylist";
import { Playlist } from "../../types/playlist";
import DeletePlaylist from "./DeletePlaylist";
import { useNavigate } from "react-router-dom";

interface CreatePPProps {
  isExpanded: boolean;
}

const CreatePP: React.FC<CreatePPProps> = ({ isExpanded }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = localStorage.getItem("user");
  const [playlistToDelete, setPlaylistToDelete] = useState<Playlist | null>(
    null
  );
  const navigate = useNavigate();

  const handleCreatePlaylist = async () => {
    if (!user) {
      return;
    }
    await dispatch(createPlaylistThunk());
    await dispatch(userPlaylistThunk());
  };
  const { userPlaylist } = usePlaylist();

  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(userPlaylistThunk());
  }, [dispatch]);

  const handleDeletePlaylist = (playlistToDelete: Playlist) => {
    handleClose();
    setPlaylistToDelete(playlistToDelete);
  };

  const handleClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex-grow mr-4 h-full overflow-hidden select-none">
      {userPlaylist &&
      userPlaylist.playlists &&
      userPlaylist.playlists.length > 0 ? (
        <div className="py-2 px-3">
          <div className="space-y-2">
            {userPlaylist?.playlists.map((playlist) => (
              <div
                key={playlist.playlistId}
                className="flex items-center gap-x-4 p-2 bg-[#292929] rounded-lg shadow-lg hover:bg-slate-700 transition-all duration-200 cursor-pointer group"
                onClick={() => navigate(`/playlist/${playlist.playlistId}`)}
              >
                {playlist?.backgroundImage ? (
                  <div className="relative">
                    <img
                      src={playlist.backgroundImage}
                      alt={playlist.title}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <i className="fa-solid fa-play text-white text-lg"></i>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-12 w-12 rounded-xl flex justify-center items-center bg-[#242424]">
                    <i className="fa-solid fa-music text-gray-400"></i>
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <i className="fa-solid fa-play text-white text-lg"></i>
                    </div>
                  </div>
                )}

                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{playlist.title}</p>
                  <p className="text-sm text-gray-400">
                    {t("sidebar.playlist")}
                  </p>
                </div>
                {isExpanded && (
                  <div
                    className="cursor-pointer hover:text-white text-gray-400 ml-auto mr-5 duration-200 hover:bg-gray-500 bg-opacity-10 hover:rounded-full w-10 h-10 flex justify-center items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePlaylist(playlist);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </div>
                )}
                {isModalOpen && (
                  <DeletePlaylist
                    onClose={handleClose}
                    playlist={playlistToDelete}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-64 overflow-y-auto custom-scrollbar py-2 px-3">
          <div className="bg-[#292929] py-4 px-2 rounded-xl mb-5">
            <p className="font-bold text-lg leading-8">
              {t("sidebar.CPlaylist")}
            </p>
            <p className="leading-8">{t("sidebar.CPlaylistDes")}</p>
            <button
              className="bg-white rounded-full px-4 py-2 my-2 transform hover:scale-105 hover:bg-slate-200 duration-200"
              onClick={handleCreatePlaylist}
            >
              <div className="text-black font-bold text-base">
                {t("sidebar.CPlaylistButton")}
              </div>
            </button>
          </div>

          <div className="bg-[#292929] py-4 px-2 rounded-xl mt-5">
            <p className="font-bold text-lg leading-8">
              {t("sidebar.SPodcast")}
            </p>
            <p className="leading-8">{t("sidebar.SPodcaseDes")}</p>
            <button className="bg-white rounded-full px-4 py-2 my-2 transform hover:scale-105 hover:bg-slate-200 duration-200">
              <div className="text-black font-bold text-base">
                {t("sidebar.SPodcastButton")}
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePP;
