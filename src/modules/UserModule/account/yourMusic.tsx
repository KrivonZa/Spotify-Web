import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../stores";
import { useDispatch } from "react-redux";
import { getMusicByUserThunk } from "../../../stores/musicManager/thunk";
import { useUser } from "../../../hooks/useUser";
import { useMusic } from "../../../hooks/useMusic";
import { getMusic } from "../../../types/music";
import DeleteMusic from "../../../components/ArtistComponent/DeleteMusic";
import AddToPlaylist from "../../../components/ArtistComponent/AddToPlaylist";
import UploadMusic from "../../../components/ArtistComponent/uploadMusic";

export function YourMusic() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const { artistMusic } = useMusic();
  const [displayStatus, setDisplayStatus] = useState(true);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUploadOpen, setIsModalUploadOpen] = useState(false);
  const [musicToDelete, setMusicToDelete] = useState<getMusic | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [musicToAdd, setMusicToAdd] = useState<getMusic | null>(null);

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) navigate("/");
    if (userInfo) dispatch(getMusicByUserThunk(userInfo.id));
  }, [dispatch, userInfo]);

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

  const handleUpload = () => {
    setIsModalUploadOpen((prev) => !prev);
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
        <p className="font-bold text-4xl text-center">{t("yourMusic.title")}</p>

        {artistMusic && artistMusic?.length > 0 ? (
          <div className="px-4 py-10">
            <div className="flex justify-between items-center">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 hover:scale-105 duration-200 max-w-[50%] transform flex justify-center items-center shadow-md mt-4"
                onClick={handleUpload}
              >
                <p className="text-base font-semibold">
                  {t("yourMusic.createNew")}
                </p>
              </button>
              <div
                className="cursor-pointer flex items-center space-x-2 group"
                onClick={() => setDisplayStatus(!displayStatus)}
              >
                <p className="text-gray-300 group-hover:text-white duration-150">
                  {displayStatus
                    ? t("playlistDetail.list")
                    : t("playlistDetail.compact")}
                </p>
                <i
                  className={`fa-solid ${
                    displayStatus ? "fa-list" : "fa-bars"
                  } text-gray-300 group-hover:text-white duration-150`}
                ></i>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex flex-col gap-y-1 py-6">
                {displayStatus ? (
                  <div className="py-2 px-4 grid grid-cols-[20px_1fr_70px] items-center text-gray-400 gap-x-6 w-full">
                    <p>#</p>
                    <p>{t("playlistDetail.title")}</p>
                    <i className="fa-regular fa-clock text-center"></i>
                  </div>
                ) : (
                  <div className="py-2 px-4 grid grid-cols-[20px_1fr_1fr_70px] items-center text-gray-400 gap-x-6 w-full">
                    <p>#</p>
                    <p>{t("playlistDetail.title")}</p>
                    <p>{t("playlistDetail.artist")}</p>
                    <i className="fa-regular fa-clock text-center"></i>
                  </div>
                )}

                {displayStatus
                  ? artistMusic?.map((music, index) => (
                      <div
                        key={index}
                        className="py-2 px-4 grid grid-cols-[20px_1fr_100px] items-center text-gray-400 gap-x-6 w-full hover:bg-slate-700 bg-opacity-15 duration-150 rounded-lg group"
                      >
                        <p className="text-center">
                          <span className="group-hover:hidden">
                            {index + 1}
                          </span>
                          <i className="fa-solid fa-play hidden group-hover:inline text-white text-sm"></i>
                        </p>
                        <div className="flex items-center gap-x-2">
                          {music.thumbnail ? (
                            <img
                              src={music.thumbnail}
                              className="h-12 w-12 rounded-lg"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-md flex justify-center items-center bg-[#242424]">
                              <i className="fa-solid fa-music text-gray-400"></i>
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-white">
                              {music.musicName}
                            </p>
                            <p className="hover:underline cursor-pointer duration-150 group-hover:text-white">
                              {music.artistCollaboration
                                ?.map((artist) => artist.account.nickname)
                                .join(" • ")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-x-3 relative">
                          <i
                            className="fa-solid fa-circle-plus hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"
                            onClick={() => handleOpenAddModal(music)}
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
                            onClick={() => handleEllipsis(index)}
                          ></i>
                          {isOpen === index && (
                            <div className="absolute z-10 top-full right-0 mt-2 bg-[#414141] text-white px-5 py-2 rounded-lg shadow-lg flex justify-center items-center gap-x-2 w-auto whitespace-nowrap">
                              <i className="fa-solid fa-trash"></i>
                              <button
                                className="font-bold text-left"
                                onClick={() => handleDelete(music)}
                              >
                                {t("yourMusic.delete")}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  : artistMusic?.map((music, index) => (
                      <div
                        key={index}
                        className="py-2 px-4 grid grid-cols-[20px_1fr_1fr_100px] items-center text-gray-400 gap-x-6 w-full hover:bg-slate-700 bg-opacity-15 duration-150 rounded-lg group"
                      >
                        <p className="text-center">
                          <span className="group-hover:hidden">
                            {index + 1}
                          </span>
                          <i className="fa-solid fa-play hidden group-hover:inline text-white text-sm"></i>
                        </p>
                        <div className="flex items-center gap-x-2">
                          {music.thumbnail ? (
                            <img
                              src={music.thumbnail}
                              className="h-12 w-12 rounded-lg"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-md flex justify-center items-center bg-[#242424]">
                              <i className="fa-solid fa-music text-gray-400"></i>
                            </div>
                          )}
                          <p className="font-semibold text-white">
                            {music.musicName}
                          </p>
                        </div>
                        <p className="hover:underline cursor-pointer duration-150 group-hover:text-white">
                          {music.artistCollaboration
                            ?.map((artist) => artist.account.nickname)
                            .join(" • ")}
                        </p>
                        <div className="flex items-center justify-end gap-x-3 relative">
                          <i
                            className="fa-solid fa-circle-plus hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"
                            onClick={() => handleOpenAddModal(music)}
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
                            onClick={() => handleEllipsis(index)}
                          ></i>
                          {isOpen === index && (
                            <div className="absolute z-10 top-full right-0 mt-2 bg-[#414141] text-white px-5 py-2 rounded-lg shadow-lg flex justify-center items-center gap-x-2 w-auto whitespace-nowrap">
                              <i className="fa-solid fa-trash"></i>
                              <button
                                className="font-bold text-left"
                                onClick={() => handleDelete(music)}
                              >
                                {t("yourMusic.delete")}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-10">
            <p className="font-bold text-lg">{t("yourMusic.empty")}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 hover:scale-105 duration-200 max-w-[50%] transform flex justify-center items-center shadow-md mt-4">
              <p className="text-base font-semibold" onClick={handleUpload}>
                {t("yourMusic.createNew")}
              </p>
            </button>
          </div>
        )}
        {isModalDeleteOpen && (
          <DeleteMusic onClose={handleDeleteClose} music={musicToDelete} />
        )}
        {isModalAddOpen && (
          <AddToPlaylist onClose={handleCloseAddModal} music={musicToAdd} />
        )}
        {isModalUploadOpen && <UploadMusic onClose={handleUpload} />}
      </div>
    </section>
  );
}
