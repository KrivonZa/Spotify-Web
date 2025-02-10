import { useEffect } from "react";
import { useColor } from "../../../globalContext/ColorContext";
import { useTranslation } from "react-i18next";
import { processImageAndSetBackground } from "../../../tools/dominantColor";
import { useNavigate } from "react-router-dom";
import {
  userPlaylistThunk,
  getAllPlaylistThunk,
} from "../../../stores/playlistManager/thunk";
import { getAllArtistThunk } from "../../../stores/artistManager/thunk";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { useMusic } from "../../../hooks/useMusic";
import { useArtist } from "../../../hooks/useArtist";
import { useUser } from "../../../hooks/useUser";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { useSong } from "../../../globalContext/SongContext";

export function HomePage() {
  const { t } = useTranslation();
  const { setPrimaryColor } = useColor();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userPlaylist, allPlaylist } = usePlaylist();
  const { searchMusic } = useMusic();
  const { userInfo } = useUser();
  const { searchArtist, getAllArtist } = useArtist();
  const { setSelectedMusic } = useSong();

  useEffect(() => {
    if (userInfo) {
      dispatch(userPlaylistThunk());
    }
    dispatch(getAllPlaylistThunk());
    dispatch(getAllArtistThunk());
  }, [dispatch, userInfo?.id]);

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
    setSelectedMusic(Array.isArray(item) ? item : [item]);
  };

  const handleArtist = (
    accountId: string | undefined,
    name: string | undefined,
    avatar: string | undefined
  ) => {
    if (userInfo?.id === accountId) {
      navigate("/user");
      return;
    }
    let cleanedAvatar = avatar?.replace(
      "https://image-media.trangiangkhanh.site/",
      ""
    );
    if (!cleanedAvatar?.trim()) {
      cleanedAvatar = "null";
    }
    navigate(`/artist/${accountId}/${name}/${cleanedAvatar}`);
  };

  return (
    <section className="min-h-screen">
      <div className="px-7 py-5">
        {userInfo && (
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
          {userInfo &&
            userPlaylist?.playlists.map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-15 hover:bg-opacity-25 duration-200 h-12 flex items-center rounded overflow-hidden cursor-pointer"
                onMouseEnter={() => handleMouseEnter(item.backgroundImage)}
                onMouseLeave={handleMouseLeave}
                onClick={() => navigate(`playlist/${item.playlistId}`)}
              >
                {item?.backgroundImage ? (
                  <img
                    className="w-12 h-full object-cover bg-[#242424]"
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

        {searchMusic && searchMusic.length > 0 && (
          <div className="mb-10">
            <p className="font-bold text-2xl">{t("homepage.allSong")}</p>
            <div className="flex items-center gap-x-4 py-6 overflow-x-auto overflow-y-hidden custom-scrollbar scrollbar-hide hover:scrollbar-default pb-4 hover:pb-2">
              {searchMusic.map((item, index) => (
                <div
                  key={index}
                  className="group relative hover:bg-slate-700 bg-opacity-15 p-4 rounded-lg cursor-pointer duration-200 shrink-0"
                  onClick={() => handleMusicClick(item)}
                >
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      className="w-44 h-44 rounded-full mb-3"
                      alt={item.musicName}
                    />
                  ) : (
                    <div className="h-44 w-44 flex justify-center rounded-full items-center bg-[#242424]">
                      <i className="text-3xl fa-solid fa-music text-gray-400"></i>
                    </div>
                  )}
                  <p className="text-lg font-medium">{item.musicName}</p>
                  <div className="absolute top-full left-[80%] -translate-x-1/2 bg-green-500 p-2 rounded-full text-white opacity-0 group-hover:top-1/2 group-hover:opacity-100 transition-all duration-300 w-12 h-12 flex justify-center items-center">
                    <i className="fa-solid fa-play text-lg text-black"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <p className="font-bold text-2xl">{t("homepage.allPlaylist")}</p>
          <div className="flex items-center gap-x-4 py-6 overflow-x-auto overflow-y-hidden custom-scrollbar scrollbar-hide hover:scrollbar-default pb-4 hover:pb-2">
            {allPlaylist?.map((item, index) => (
              <div
                key={index}
                className="group relative hover:bg-slate-700 bg-opacity-15 p-4 rounded-lg cursor-pointer duration-200 shrink-0"
                onClick={() => navigate(`playlist/${item.playlistId}`)}
              >
                {item.backgroundImage ? (
                  <img
                    src={item.backgroundImage}
                    className="w-44 h-44 rounded-full mb-3"
                    alt={item.title}
                  />
                ) : (
                  <div className="h-44 w-44 flex justify-center rounded-full items-center bg-[#242424]">
                    <i className="text-3xl fa-solid fa-music text-gray-400"></i>
                  </div>
                )}
                <p className="text-lg font-medium">{item.title}</p>
                <div className="absolute top-full left-[80%] -translate-x-1/2 bg-green-500 p-2 rounded-full text-white opacity-0 group-hover:top-1/2 group-hover:opacity-100 transition-all duration-300 w-12 h-12 flex justify-center items-center">
                  <i className="fa-solid fa-play text-lg text-black"></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        {getAllArtist && getAllArtist.length > 0 && !searchArtist && (
          <div className="mb-10">
            <p className="font-bold text-2xl">{t("homepage.allArtist")}</p>
            <div className="flex items-center gap-x-4 py-6 overflow-x-auto overflow-y-hidden custom-scrollbar scrollbar-hide hover:scrollbar-default pb-4 hover:pb-2">
              {getAllArtist.map((item, index) => (
                <div
                  key={index}
                  className="group relative hover:bg-slate-700 bg-opacity-15 p-4 rounded-lg cursor-pointer duration-200 shrink-0"
                  onClick={() =>
                    handleArtist(item.id, item.nickname, item.avatar)
                  }
                >
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      className="w-44 h-44 rounded-full mb-3"
                      alt={item.nickname}
                    />
                  ) : (
                    <div className="h-44 w-44 flex justify-center items-center rounded-full bg-[#242424]">
                      <i className="text-3xl fa-solid fa-headphones text-gray-400"></i>
                    </div>
                  )}
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
        )}

        {searchArtist && searchArtist.length > 0 && (
          <div className="my-10">
            <p className="font-bold text-2xl">{t("homepage.allArtist")}</p>
            <div className="flex items-center gap-x-4 py-6 overflow-x-auto overflow-y-hidden custom-scrollbar scrollbar-hide hover:scrollbar-default pb-4 hover:pb-2">
              {searchArtist.map((item, index) => (
                <div
                  key={index}
                  className="group relative hover:bg-slate-700 bg-opacity-15 p-4 rounded-lg cursor-pointer duration-200 shrink-0"
                  onClick={() =>
                    handleArtist(item.id, item.nickname, item.avatar)
                  }
                >
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      className="w-44 h-44 rounded-full mb-3"
                      alt={item.nickname}
                    />
                  ) : (
                    <div className="h-44 w-44 flex justify-center items-center rounded-full bg-[#242424]">
                      <i className="text-3xl fa-solid fa-headphones text-gray-400"></i>
                    </div>
                  )}
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
        )}
      </div>
    </section>
  );
}
