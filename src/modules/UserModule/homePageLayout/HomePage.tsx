import { useEffect, useState } from "react";
import { useColor } from "../../../globalContext/ColorContext";
import { useTranslation } from "react-i18next";
import data from "./data.json";
import { processImageAndSetBackground } from "../../../tools/dominantColor";
import { useNavigate } from "react-router-dom";
import { userPlaylistThunk } from "../../../stores/playlistManager/thunk";
import { getAllArtistThunk } from "../../../stores/artistManager/thunk";
import { getAllMusicThunk } from "../../../stores/musicManager/thunk";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { useMusic } from "../../../hooks/useMusic";
import { useArtist } from "../../../hooks/useArtist";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { useSong } from "../../../globalContext/SongContext";

export function HomePage() {
  const { t } = useTranslation();
  const { setPrimaryColor } = useColor();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userPlaylist, loading } = usePlaylist();
  const { music } = useMusic();
  const { artist } = useArtist();
  const { setSelectedMusic } = useSong();

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      dispatch(userPlaylistThunk());
    }
    dispatch(getAllArtistThunk(""));
    dispatch(getAllMusicThunk(""));
  }, [dispatch, user, artist]);

  const handleMouseEnter = async (imageUrl: string) => {
    const calculatedRgb = await processImageAndSetBackground(imageUrl);
    if (calculatedRgb) {
      setPrimaryColor(
        `rgb(${calculatedRgb.r}, ${calculatedRgb.g}, ${calculatedRgb.b})`
      );
    }
  };

  const handleMouseLeave = () => {
    setPrimaryColor("#383838");
  };

  const handleMusicClick = (item: any) => {
    setSelectedMusic(item);
  };

  return (
    <section className="min-h-screen">
      <div className="px-7 py-5">
        {user && (
          <div className="flex gap-x-3 font-medium">
            <button className="px-4 py-1 rounded-full bg-white bg-opacity-15 hover:bg-opacity-25 duration-200">
              {t("homepage.all")}
            </button>
            <button className="px-4 py-1 rounded-full bg-white bg-opacity-15 hover:bg-opacity-25 duration-200">
              {t("homepage.music")}
            </button>
            <button className="px-4 py-1 rounded-full bg-white bg-opacity-15 hover:bg-opacity-25 duration-200">
              {t("homepage.podcast")}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-5">
          {user &&
            userPlaylist.map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-15 hover:bg-opacity-25 duration-200 h-12 flex items-center rounded overflow-hidden cursor-pointer"
                onMouseEnter={() => handleMouseEnter(item.backgroundImage)}
                onMouseLeave={handleMouseLeave}
              >
                {item?.backgroundImage ? (
                  <img
                    className="w-12 h-full object-cover"
                    src={item.backgroundImage}
                    alt={item.title}
                  />
                ) : (
                  <div className="relative h-12 w-12 flex justify-center items-center bg-[#242424]">
                    <i className="fa-solid fa-music text-gray-400"></i>
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <i className="fa-solid fa-play text-white text-lg"></i>
                    </div>
                  </div>
                )}
                <p className="font-medium px-2 py-1 text-sm text-pretty">
                  {item.title}
                </p>
              </div>
            ))}
        </div>

        <div className="mb-10">
          <p className="font-bold text-2xl">{t("homepage.allSong")}</p>
          <div className="flex items-center gap-x-4 py-6 overflow-x-auto overflow-y-hidden custom-scrollbar scrollbar-hide hover:scrollbar-default pb-4 hover:pb-2">
            {music?.map((item, index) => (
              <div
                key={index}
                className="group relative hover:bg-slate-700 bg-opacity-15 p-4 rounded-lg cursor-pointer duration-200 shrink-0"
                onClick={() => handleMusicClick(item)}
              >
                <img
                  src={item.thumbnail}
                  className="w-44 h-44 rounded-full mb-3"
                  alt={item.musicName}
                />
                <p className="text-lg font-medium">{item.musicName}</p>
                <div className="absolute top-full left-[80%] -translate-x-1/2 bg-green-500 p-2 rounded-full text-white opacity-0 group-hover:top-1/2 group-hover:opacity-100 transition-all duration-300 w-12 h-12 flex justify-center items-center">
                  <i className="fa-solid fa-play text-lg text-black"></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10">
          <p className="font-bold text-2xl">{t("homepage.allArtist")}</p>
          <div className="flex items-center gap-x-4 py-6 overflow-x-auto overflow-y-hidden custom-scrollbar scrollbar-hide hover:scrollbar-default pb-4 hover:pb-2">
            {artist?.map((item, index) => (
              <div
                key={index}
                className="group relative hover:bg-slate-700 bg-opacity-15 p-4 rounded-lg cursor-pointer duration-200 shrink-0"
              >
                <img
                  src={item.avatar}
                  className="w-44 h-44 rounded-full mb-3"
                  alt={item.nickname}
                />
                <p className="text-lg font-medium">{item.nickname}</p>
                <p className="text-gray-400 text-sm font-medium">
                  {t("profile.artist")}
                </p>
                <div className="absolute top-full left-[80%] -translate-x-1/2 bg-green-500 p-2 rounded-full text-white opacity-0 group-hover:top-1/2 group-hover:opacity-100 transition-all duration-300 w-12 h-12 flex justify-center items-center">
                  <i className="fa-solid fa-play text-lg text-black"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
