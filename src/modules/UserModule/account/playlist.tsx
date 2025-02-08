import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import UpdateNA from "../../../components/ProfieComponent/updateNA";
import { AppDispatch } from "../../../stores";
import { useDispatch } from "react-redux";
import { userInfoThunk } from "../../../stores/userManager/thunk";
import { getPlaylistDetailThunk } from "../../../stores/playlistManager/thunk";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { motion } from "framer-motion";

export function Playlist() {
  const dispatch = useDispatch<AppDispatch>();
  const { playlistDetail } = usePlaylist();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isUpdateNA, setUpdateNA] = useState(false);
  const [displayStatus, setDisplayStatus] = useState(true);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const { playlistId } = useParams();
  const [durations, setDurations] = useState<string[]>([]);

  console.log(audioRefs)

  useEffect(() => {
    if (!playlistId) return;
    dispatch(getPlaylistDetailThunk(playlistId));
  }, [dispatch]);

  const handleUpdateClick = () => {
    setUpdateNA(true);
  };

  const handleAudioLoaded = (index: number, audioElement: HTMLAudioElement) => {
    const duration = audioElement.duration;
    setDurations(prev => {
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

  return (
    <section className="min-h-screen">
      <div className="flex items-end px-6 pb-6 pt-10">
        <div
          className="relative w-52 h-52 group cursor-pointer"
          onClick={handleUpdateClick}
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

          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <p className="hover:underline duration-100 text-lg">
              {t("playlistDetail.choose")}
            </p>
            <i className="fa-solid fa-pen text-2xl"></i>
            <p className="hover:underline duration-100 text-lg">
              {t("playlistDetail.remove")}
            </p>
          </div>
        </div>
        <div className="ml-6 flex flex-col gap-y-2">
          <p className="text-sm font-semibold">
            {t("playlistDetail.playlist")}
          </p>
          <p
            className="text-7xl font-extrabold cursor-pointer"
            onClick={handleUpdateClick}
          >
            {playlistDetail?.title}
          </p>
          <p className="my-2 text-gray-400">{playlistDetail?.description}</p>
          {playlistDetail?.songCount !== 0 && (
            <p>
              {playlistDetail?.songCount}
              {t("playlistDetail.song")} &bull; {playlistDetail?.lengthOfTime}{" "}
            </p>
          )}
        </div>
      </div>
      {playlistDetail?.musics && playlistDetail?.musics.length > 0 && (
        <div className="px-4 py-10">
          <div className="mt-6 flex justify-end">
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
                  <p>Title</p>
                  <i className="fa-regular fa-clock text-center"></i>
                </div>
              ) : (
                <div className="py-2 px-4 grid grid-cols-[20px_1fr_1fr_70px] items-center text-gray-400 gap-x-6 w-full">
                  <p>#</p>
                  <p>Title</p>
                  <p>Artist</p>
                  <i className="fa-regular fa-clock text-center"></i>
                </div>
              )}

              {displayStatus
                ? playlistDetail?.musics.map((music, index) => (
                    <div
                      key={index}
                      className="py-2 px-4 grid grid-cols-[20px_1fr_100px] items-center text-gray-400 gap-x-6 w-full hover:bg-slate-700 bg-opacity-15 duration-150 rounded-lg group"
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
                          <p className="hover:underline cursor-pointer duration-150 group-hover:text-white">
                            {music.artistCollaboration
                              ?.map((artist) => artist.account.nickname)
                              .join(" • ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-x-3">
                        <i className="fa-solid fa-circle-plus hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"></i>
                        <audio 
                          src={music.musicUrl} 
                          ref={el => {
                            audioRefs.current[index] = el; 
                            if (el) {
                              el.onloadedmetadata = () => handleAudioLoaded(index, el);
                            }
                          }} 
                        />
                        <p>{durations[index] || "0:00"}</p>
                        <i className="fa-solid fa-ellipsis hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"></i>
                      </div>
                    </div>
                  ))
                : playlistDetail?.musics.map((music, index) => (
                    <div
                      key={index}
                      className="py-2 px-4 grid grid-cols-[20px_1fr_1fr_100px] items-center text-gray-400 gap-x-6 w-full hover:bg-slate-700 bg-opacity-15 duration-150 rounded-lg group"
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
                        <p className="font-semibold text-white">
                          {music.musicName}
                        </p>
                      </div>
                      <p className="hover:underline cursor-pointer duration-150 group-hover:text-white">
                        {music.artistCollaboration
                          ?.map((artist) => artist.account.nickname)
                          .join(" • ")}
                      </p>
                      <div className="flex items-center justify-end gap-x-3">
                        <i className="fa-solid fa-circle-plus hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"></i>
                        <p>5:18</p>
                        <i className="fa-solid fa-ellipsis hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"></i>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
      {/* {isUpdateNA && (
        <UpdateNA
          userInfo={userInfo}
          onClose={() => {
            setUpdateNA(false);
          }}
        />
      )} */}
    </section>
  );
}
