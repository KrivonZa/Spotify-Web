import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UpdateNA from "../../../components/ProfieComponent/updateNA";
import { AppDispatch } from "../../../stores";
import { useDispatch } from "react-redux";
import { userInfoThunk } from "../../../stores/userManager/thunk";
import { userPlaylistThunk } from "../../../stores/playlistManager/thunk";
import { getMusicByUserThunk } from "../../../stores/musicManager/thunk";
import { useUser } from "../../../hooks/useUser";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { useMusic } from "../../../hooks/useMusic";
import { useSong } from "../../../globalContext/SongContext";
import { getMusic } from "../../../types/music";
import DeleteMusic from "../../../components/ArtistComponent/DeleteMusic";
import AddToPlaylist from "../../../components/ArtistComponent/AddToPlaylist";

export function MainProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useUser();
  const { userPlaylist } = usePlaylist();
  const { artistMusic } = useMusic();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSelectedMusic } = useSong();
  const [isUpdateNA, setUpdateNA] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [musicToDelete, setMusicToDelete] = useState<getMusic | null>(null);
  const [musicToAdd, setMusicToAdd] = useState<getMusic | null>(null);

  useEffect(() => {
    if (!userInfo) return;
    dispatch(userInfoThunk());
    dispatch(userPlaylistThunk());
    dispatch(getMusicByUserThunk(userInfo.id));
  }, [dispatch, userInfo?.id]);

  const handleUpdateClick = () => {
    setUpdateNA(true);
  };

  const handleAudioLoaded = (index: number, audioElement: HTMLAudioElement) => {
    const duration = audioElement.duration;
    setDurations((prev) => {
      const newDurations = [...prev];
      newDurations[index] = formatTime(duration);
      return newDurations;
    });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleEllipsis = (index: number) => {
    setIsOpen((prev) => (prev === index ? null : index));
  };

  const handleDelete = (musicToDelete: getMusic) => {
    setIsOpen(null);
    handleDeleteClose();
    setMusicToDelete(musicToDelete);
  };

  const handleDeleteClose = () => {
    setIsModalDeleteOpen(!isModalDeleteOpen);
  };

  const handleOpenAddModal = (music: getMusic) => {
    setMusicToAdd(music);
    setIsModalAddOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsModalAddOpen(false);
    setMusicToAdd(null);
  };

  const handleMusicOneClick = (item: any, index: number) => {
    const reorderedList = [...item.slice(index), ...item.slice(0, index)];
    setSelectedMusic(reorderedList);
  };

  return (
    <section className="min-h-screen">
      <div className="flex items-end px-6 pb-6 pt-24">
        <div
          className="relative w-52 h-52 group cursor-pointer"
          onClick={handleUpdateClick}
        >
          <img
            src={
              userInfo?.avatar ||
              "https://media.istockphoto.com/id/1305665241/vector/anonymous-gender-neutral-face-avatar-incognito-head-silhouette-stock-illustration.jpg?s=612x612&w=0&k=20&c=qA6GUTalFyrBCRVUzQgp2B5zODxmOA4NXTBcw9notYY="
            }
            className="w-52 h-52 rounded-full object-cover shadow-xl"
          />

          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
            <p className="hover:underline duration-100 text-lg">
              {t("profile.choose")}
            </p>
            <i className="fa-solid fa-pen text-2xl"></i>
            <p className="hover:underline duration-100 text-lg">
              {t("profile.remove")}
            </p>
          </div>
        </div>
        <div className="ml-6 flex flex-col gap-y-2">
          <p className="text-sm font-semibold">{t("profile.profile")}</p>
          <p
            className="text-7xl font-extrabold cursor-pointer"
            onClick={handleUpdateClick}
          >
            {userInfo?.nickName}
          </p>
        </div>
      </div>
      <div className="px-4 py-10">
        <div className="mt-6">
          <p className="text-xl font-bold">{t("profile.allPlaylist")}</p>
          <div
            className={`flex items-center gap-x-4 py-6 overflow-x-auto custom-scrollbar overflow-y-hidden scrollbar-hide hover:scrollbar-default pb-4 hover:pb-2 ${
              !userPlaylist ||
              (userPlaylist.playlists.length < 1 && "justify-center")
            }`}
          >
            {userPlaylist && userPlaylist.playlists.length > 0 ? (
              userPlaylist.playlists.map((playlist, index) => (
                <div
                  key={index}
                  className="group relative hover:bg-slate-700 bg-opacity-15 p-4 rounded-lg cursor-pointer duration-200"
                  onClick={() => navigate(`/playlist/${playlist.playlistId}`)}
                >
                  <img
                    src={playlist.backgroundImage}
                    className="w-44 h-44 rounded-full mb-3"
                    alt={playlist.title}
                  />
                  <p className="text-lg font-medium">{playlist.title}</p>
                  <p className="text-gray-400 text-sm font-medium">
                    {t("profile.playlist")}
                  </p>
                  <div className="absolute top-full left-[80%] -translate-x-1/2 bg-green-500 p-2 rounded-full text-white opacity-0 group-hover:top-1/2 group-hover:opacity-100 transition-all duration-300 w-12 h-12 flex justify-center items-center">
                    <i className="fa-solid fa-play text-lg text-black"></i>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center mt-10">
                <p className="font-bold text-lg">{t("profile.empty")}</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 hover:scale-105 duration-200 max-w-[50%] transform flex justify-center items-center shadow-md mt-4">
                  <p className="text-base font-semibold">
                    {t("profile.createNew")}
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>

        {userInfo?.isSubcribe && (
          <div className="mt-6">
            <p className="text-xl font-bold">{t("profile.allSong")}</p>

            <div className="flex flex-col gap-y-1 py-6">
              {artistMusic && artistMusic.length > 0 ? (
                artistMusic.map((music, index) => (
                  <div
                    key={index}
                    className="py-2 px-4 grid grid-cols-[20px_1fr_100px] items-center text-gray-400 gap-x-6 w-full hover:bg-slate-700 bg-opacity-15 duration-150 rounded-lg group"
                    onClick={() => handleMusicOneClick(artistMusic, index)}
                  >
                    <p className="text-center">
                      <span className="group-hover:hidden">{index + 1}</span>
                      <i className="fa-solid fa-play hidden group-hover:inline text-white text-sm"></i>
                    </p>
                    <div className="flex items-center gap-x-2">
                      <img
                        src={music.thumbnail}
                        className="h-12 w-12 rounded-lg"
                      />
                      <div>
                        <p className="font-semibold text-white">
                          {music.musicName}
                        </p>
                        <p className="duration-150 group-hover:text-white">
                          {music.artistCollaboration
                            ?.map((artist) => artist.account.nickname)
                            .join(" • ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-3 relative">
                      <i
                        className="fa-solid fa-circle-plus hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAddModal(music);
                        }}
                      ></i>
                      <audio
                        src={music.musicUrl}
                        ref={(el) => {
                          audioRefs.current[index] = el;
                          if (el) {
                            el.onloadedmetadata = () =>
                              handleAudioLoaded(index, el);
                          }
                        }}
                      />
                      <p>{durations[index] || "0:00"}</p>
                      <i
                        className="fa-solid fa-ellipsis hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEllipsis(index);
                        }}
                      ></i>
                      {isOpen === index && (
                        <div className="absolute z-10 top-full right-0 mt-2 bg-[#414141] text-white px-5 py-2 rounded-lg shadow-lg flex justify-center items-center gap-x-2 w-auto whitespace-nowrap">
                          <i className="fa-solid fa-trash"></i>
                          <button
                            className="font-bold text-left"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(music);
                            }}
                          >
                            {t("yourMusic.delete")}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col justify-center items-center mt-10">
                  <p className="font-bold text-lg">{t("profile.emptyMusic")}</p>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 hover:scale-105 duration-200 max-w-[50%] transform flex justify-center items-center shadow-md mt-4">
                    <p className="text-base font-semibold">
                      {t("profile.createNewMusic")}
                    </p>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {isUpdateNA && (
        <UpdateNA
          userInfo={userInfo}
          onClose={() => {
            setUpdateNA(false);
          }}
        />
      )}
      {isModalDeleteOpen && (
        <DeleteMusic onClose={handleDeleteClose} music={musicToDelete} />
      )}
      {isModalAddOpen && (
        <AddToPlaylist onClose={handleCloseAddModal} music={musicToAdd} />
      )}
    </section>
  );
}
