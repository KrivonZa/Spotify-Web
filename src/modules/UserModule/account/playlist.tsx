import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../../stores";
import { useDispatch } from "react-redux";
import { getPlaylistDetailThunk } from "../../../stores/playlistManager/thunk";
import { userInfoThunk } from "../../../stores/userManager/thunk";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { useSong } from "../../../globalContext/SongContext";
import { useUser } from "../../../hooks/useUser";
import { getMusic } from "../../../types/music";
import { playlistDetail } from "../../../types/playlist";
import AddToPlaylist from "../../../components/ArtistComponent/AddToPlaylist";
import RemoveMusic from "../../../components/ArtistComponent/RemoveMusic";
import UpdatePlaylist from "../../../components/ArtistComponent/updatePlaylist";

export function Playlist() {
  const dispatch = useDispatch<AppDispatch>();
  const { playlistDetail } = usePlaylist();
  const { t } = useTranslation();
  const { setSelectedMusic } = useSong();
  const { userInfo } = useUser();
  const navigate = useNavigate();
  const [isUpdatePlaylist, setUpdatePlaylist] = useState(false);
  const [displayStatus, setDisplayStatus] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const { playlistId } = useParams();
  const [durations, setDurations] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);
  const [musicToAdd, setMusicToAdd] = useState<getMusic | null>(null);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [musicToRemove, setMusicToRemove] = useState<getMusic | null>(null);
  const [playlistRemoved, setPlaylistRemoved] = useState<playlistDetail | null>(
    null
  );

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) dispatch(userInfoThunk());
    if (playlistId) dispatch(getPlaylistDetailThunk(playlistId));
  }, [dispatch, user, playlistId]);

  useEffect(() => {
    if (userInfo && playlistDetail) {
      setIsOwner(userInfo.id === playlistDetail.account.id);
    }
  }, [userInfo, playlistDetail]);

  const handleUpdateClick = () => {
    setUpdatePlaylist(true);
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

  const handlePlay = (item: any) => {
    setIsPlaying(!isPlaying);
    handleMusicClick(item);
  };

  const handleMusicClick = (item: any) => {
    setSelectedMusic(Array.isArray(item) ? item : [item]);
  };

  const handleMusicOneClick = (item: any, index: number) => {
    const reorderedList = [...item.slice(index), ...item.slice(0, index)];
    setSelectedMusic(reorderedList);
  };

  const handleAuthorName = (
    accountId: string | undefined,
    name: string | undefined,
    avatar: string | undefined
  ) => {
    let cleanedAvatar = avatar?.replace(
      "https://mygkhanhs3.s3.ap-southeast-2.amazonaws.com/",
      ""
    );

    if (isOwner) {
      navigate("/user");
      return;
    }
    if (!cleanedAvatar?.trim()) {
      cleanedAvatar = "null";
    }
    navigate(`/artist/${accountId}/${name}/${cleanedAvatar}`);
  };

  const handleOpenAddModal = (music: getMusic) => {
    setMusicToAdd(music);
    setIsModalAddOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsModalAddOpen(false);
    setMusicToAdd(null);
  };

  const handleEllipsis = (index: number) => {
    setIsOpen((prev) => (prev === index ? null : index));
  };

  const handleRemove = (
    musicToRemove: getMusic,
    playlistDetail: playlistDetail
  ) => {
    setIsOpen(null);
    handleRemoveClose();
    setMusicToRemove(musicToRemove);
    setPlaylistRemoved(playlistDetail);
  };

  const handleRemoveClose = () => {
    setIsModalRemoveOpen(!isModalRemoveOpen);
  };

  return (
    <section className="min-h-screen">
      <div className="flex items-end px-6 pb-6 pt-10">
        <div
          className={`relative w-52 h-52 group ${isOwner && "cursor-pointer"}`}
          onClick={isOwner ? handleUpdateClick : undefined}
        >
          {playlistDetail?.backgroundImage ? (
            <img
              src={playlistDetail.backgroundImage}
              className="w-52 h-52 object-cover shadow-xl"
            />
          ) : (
            <div className="w-52 h-52 object-cover shadow-xl flex justify-center items-center bg-[#242424]">
              <i className="fa-solid fa-music text-gray-400 text-6xl"></i>
            </div>
          )}
          {isOwner && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="hover:underline duration-100 text-lg">
                {t("playlistDetail.choose")}
              </p>
              <i className="fa-solid fa-pen text-2xl"></i>
              <p className="hover:underline duration-100 text-lg">
                {t("playlistDetail.remove")}
              </p>
            </div>
          )}
        </div>
        <div className="ml-6 flex flex-col gap-y-2">
          <p className="text-sm font-semibold">
            {t("playlistDetail.playlist")}
          </p>
          <p
            className={`text-7xl font-extrabold ${isOwner && "cursor-pointer"}`}
            onClick={isOwner ? handleUpdateClick : undefined}
          >
            {playlistDetail?.title}
          </p>
          <p
            className="font-semibold text-white hover:underline duration-200 cursor-pointer mt-1"
            onClick={() =>
              handleAuthorName(
                playlistDetail?.account.id,
                playlistDetail?.account.nickName,
                playlistDetail?.account.avatar
              )
            }
          >
            {playlistDetail?.account.nickName}
          </p>
          <p className="my-1 text-gray-400">{playlistDetail?.description}</p>
          {playlistDetail?.songCount !== 0 && (
            <p>
              {playlistDetail?.songCount}
              {t("playlistDetail.song")} &bull; {playlistDetail?.lengthOfTime}{" "}
            </p>
          )}
        </div>
      </div>
      {playlistDetail?.musics && playlistDetail?.musics.length > 0 ? (
        <div className="px-4 py-10">
          <div className="mt-6 flex justify-between items-center">
            {playlistDetail?.musics.length > 0 ? (
              <button
                className="bg-green-500 p-2 rounded-full text-white duration-200 transform hover:scale-105 w-14 h-14 flex justify-center items-center ml-10"
                onClick={() => handlePlay(playlistDetail.musics)}
              >
                <i
                  className={`fa-solid text-xl text-black ${
                    isPlaying ? "fa-pause" : "fa-play"
                  }`}
                ></i>
              </button>
            ) : null}
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
                ? playlistDetail?.musics.map((music, index) => (
                    <div
                      key={index}
                      className="py-2 px-4 grid grid-cols-[20px_1fr_100px] items-center text-gray-400 gap-x-6 w-full hover:bg-slate-700 bg-opacity-15 duration-150 rounded-lg group"
                      onClick={() =>
                        handleMusicOneClick(playlistDetail.musics, index)
                      }
                    >
                      <p className="text-center">
                        <span className="group-hover:hidden">{index + 1}</span>
                        <i className="fa-solid fa-play hidden group-hover:inline text-white text-sm"></i>
                      </p>
                      <div className="flex items-center gap-x-2">
                        {music.thumbnail ? (
                          <img
                            src={music.thumbnail}
                            className="h-12 w-12 rounded-lg"
                          />
                        ) : (
                          <div className="h-12 w-12 flex justify-center items-center bg-[#242424]">
                            <i className="fa-solid fa-music text-gray-400"></i>
                          </div>
                        )}
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
                                handleRemove(music, playlistDetail);
                              }}
                            >
                              {t("playlistDetail.removeSong")}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                : playlistDetail?.musics.map((music, index) => (
                    <div
                      key={index}
                      className="py-2 px-4 grid grid-cols-[20px_1fr_1fr_100px] items-center text-gray-400 gap-x-6 w-full hover:bg-slate-700 bg-opacity-15 duration-150 rounded-lg group"
                      onClick={() =>
                        handleMusicOneClick(playlistDetail.musics, index)
                      }
                    >
                      <p className="text-center">
                        <span className="group-hover:hidden">{index + 1}</span>
                        <i className="fa-solid fa-play hidden group-hover:inline text-white text-sm"></i>
                      </p>
                      <div className="flex items-center gap-x-2">
                        {music.thumbnail ? (
                          <img
                            src={music.thumbnail}
                            className="h-12 w-12 rounded-lg"
                          />
                        ) : (
                          <div className="h-12 w-12 flex justify-center items-center bg-[#242424]">
                            <i className="fa-solid fa-music text-gray-400"></i>
                          </div>
                        )}
                        <p className="font-semibold text-white">
                          {music.musicName}
                        </p>
                      </div>
                      <p className="duration-150 group-hover:text-white">
                        {music.artistCollaboration
                          ?.map((artist) => artist.account.nickname)
                          .join(" • ")}
                      </p>
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
                                handleRemove(music, playlistDetail);
                              }}
                            >
                              {t("playlistDetail.removeSong")}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      ) : isOwner ? (
        <div className="flex flex-col justify-center items-center mt-10">
          <p className="font-bold text-lg">{t("playlistDetail.emptyMusic")}</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-10">
          <p className="font-bold text-lg">
            {t("playlistDetail.empty1")} {playlistDetail?.account.nickName}{" "}
            {t("playlistDetail.empty2")}
          </p>
        </div>
      )}
      {isUpdatePlaylist && (
        <UpdatePlaylist
          playlist={playlistDetail}
          onClose={() => {
            setUpdatePlaylist(false);
          }}
        />
      )}
      {isModalAddOpen && (
        <AddToPlaylist onClose={handleCloseAddModal} music={musicToAdd} />
      )}
      {isModalRemoveOpen && (
        <RemoveMusic
          onClose={handleRemoveClose}
          music={musicToRemove}
          playlist={playlistRemoved}
        />
      )}
    </section>
  );
}
