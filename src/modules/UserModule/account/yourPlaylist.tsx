import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../stores";
import { useDispatch } from "react-redux";
import { userPlaylistThunk } from "../../../stores/playlistManager/thunk";
import { useUser } from "../../../hooks/useUser";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { Playlist } from "../../../types/playlist";
import DeletePlaylist from "../../../components/SidebarComponent/DeletePlaylist";
import CreatePlaylist from "../../../components/ArtistComponent/CreatePlaylist";

export function YourPlaylist() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const { userPlaylist } = usePlaylist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState<Playlist | null>(
    null
  );

  useEffect(() => {
    if (!userInfo) return;
    dispatch(userPlaylistThunk());
  }, [dispatch, userInfo]);

  const handleDeletePlaylist = (playlistToDelete: Playlist) => {
    handleClose();
    setPlaylistToDelete(playlistToDelete);
  };

  const handleCreate = () => {
    handleCreateClose();
  };

  const handleCreateClose = () => {
    setIsCreateOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <section className="bg-[#121212] w-full h-full flex justify-center">
      <div className="my-20 mx-28 w-[70%] flex flex-col gap-y-5">
        <div
          className="bg-[#292929] hover:bg-[#414141] cursor-pointer duration-200 transform hover:scale-105 px-2 py-2 flex justify-center items-center h-10 w-10 rounded-full"
          onClick={() => navigate("/account")}
        >
          <i className="fa-solid fa-chevron-left text-xl"></i>
        </div>
        <p className="font-bold text-4xl text-center">
          {t("yourPlaylist.title")}
        </p>

        {userPlaylist && userPlaylist?.playlists?.length > 0 ? (
          <div className="px-4 py-10">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 hover:scale-105 duration-200 max-w-[50%] transform flex justify-center items-center shadow-md mt-4"
              onClick={handleCreate}
            >
              <p className="text-base font-semibold">
                {t("yourPlaylist.createNew")}
              </p>
            </button>
            <div className="flex flex-col gap-y-1 py-6">
              <div className="py-2 px-4 grid grid-cols-[20px_1fr_1fr] items-center text-gray-400 gap-x-6 w-full">
                <p>#</p>
                <p className="text-center">{t("playlistDetail.title")}</p>
              </div>
              {userPlaylist.playlists.map((playlist, index) => (
                <div key={playlist.playlistId}>
                  <div
                    className="flex items-center hover:bg-gray-700 gap-4 p-4 rounded-lg shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/playlist/${playlist.playlistId}`)}
                  >
                    <span>{index + 1}</span>
                    {playlist.backgroundImage ? (
                      <img
                        src={playlist.backgroundImage}
                        alt={playlist.title}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-md flex justify-center items-center bg-[#242424]">
                        <i className="fa-solid fa-music text-gray-400"></i>
                      </div>
                    )}
                    <p className="text-white text-center text-lg font-medium">
                      {" "}
                      {playlist.title}
                    </p>

                    <div className="ml-auto flex justify-center items-center gap-x-5">
                      <div
                        className="bg-[#292929] hover:bg-[#414141] text-gray-400 hover:text-white cursor-pointer duration-200 transform hover:scale-105 px-2 py-2 flex justify-center items-center h-10 w-10 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePlaylist(playlist);
                        }}
                      >
                        <i className="fa-solid fa-trash text-xl"></i>
                      </div>
                      <div
                        className="bg-[#292929] hover:bg-green-500 hover:text-black cursor-pointer duration-200 transform hover:scale-105 px-2 py-2 flex justify-center items-center h-10 w-10 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/playlist/${playlist.playlistId}`);
                        }}
                      >
                        <i className="fa-solid fa-chevron-right text-xl"></i>
                      </div>
                    </div>
                  </div>
                  {isModalOpen && (
                    <DeletePlaylist
                      onClose={handleClose}
                      playlist={playlistToDelete}
                    />
                  )}
                </div>
              ))}
              {isCreateOpen && <CreatePlaylist onClose={handleCreateClose} />}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-10">
            <p className="font-bold text-lg">{t("yourPlaylist.empty")}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 hover:scale-105 duration-200 max-w-[50%] transform flex justify-center items-center shadow-md mt-4">
              <p className="text-base font-semibold">
                {t("yourPlaylist.createNew")}
              </p>
            </button>
            {isCreateOpen && <CreatePlaylist onClose={handleCreateClose} />}
          </div>
        )}
      </div>
    </section>
  );
}
