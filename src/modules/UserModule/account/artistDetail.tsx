import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../../stores";
import { useDispatch } from "react-redux";
import { getArtistPlaylistThunk } from "../../../stores/playlistManager/thunk";
import { getMusicByUserThunk } from "../../../stores/musicManager/thunk";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { useMusic } from "../../../hooks/useMusic";
import { useSong } from "../../../globalContext/SongContext";
import { getMusic } from "../../../types/music";
import AddToPlaylist from "../../../components/ArtistComponent/AddToPlaylist";

export function ArtistDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { artistPlaylist } = usePlaylist();
  const { artistMusic } = useMusic();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { artistId, name, avatar } = useParams();
  const { setSelectedMusic } = useSong();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [musicToAdd, setMusicToAdd] = useState<getMusic | null>(null);

  const avatarUrl = `https://image-media.trangiangkhanh.site/${avatar}`;

  useEffect(() => {
    if (!artistId) return;
    dispatch(getArtistPlaylistThunk(artistId));
    dispatch(getMusicByUserThunk(artistId));
  }, [dispatch]);

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
        <div className="relative w-52 h-52">
          <img
            src={
              avatarUrl ||
              "https://media.istockphoto.com/id/1305665241/vector/anonymous-gender-neutral-face-avatar-incognito-head-silhouette-stock-illustration.jpg?s=612x612&w=0&k=20&c=qA6GUTalFyrBCRVUzQgp2B5zODxmOA4NXTBcw9notYY="
            }
            className="w-52 h-52 rounded-full object-cover shadow-xl"
          />
        </div>
        <div className="ml-6 flex flex-col gap-y-2">
          <p className="text-sm font-semibold">{t("artistDetail.artist")}</p>
          <p className="text-7xl font-extrabold">{name}</p>
        </div>
      </div>
      <div className="px-4 py-10">
        <div className="mt-6">
          <p className="text-xl font-bold">{t("artistDetail.allPlaylist")}</p>
          <div
            className={`flex items-center gap-x-4 py-6 overflow-x-auto custom-scrollbar overflow-y-hidden scrollbar-hide hover:scrollbar-default pb-4 hover:pb-2 ${
              !artistPlaylist || (artistPlaylist.length < 1 && "justify-center")
            }`}
          >
            {artistPlaylist && artistPlaylist.length > 0 ? (
              artistPlaylist.map((playlist, index) => (
                <div
                  key={index}
                  className="group relative hover:bg-slate-700 bg-opacity-15 p-4 rounded-lg cursor-pointer duration-200"
                  onClick={() => navigate(`/playlist/${playlist.playlistId}`)}
                >
                  {playlist.backgroundImage ? (
                    <img
                      src={playlist.backgroundImage}
                      className="w-44 h-44 rounded-full mb-3"
                      alt={playlist.title}
                    />
                  ) : (
                    <div className="w-44 h-44 rounded-full flex justify-center items-center bg-[#242424]">
                      <i className="text-3xl fa-solid fa-music text-gray-400"></i>
                    </div>
                  )}
                  <p className="text-lg font-medium">{playlist.title}</p>
                  <p className="text-gray-400 text-sm font-medium">
                    {t("artistDetail.playlist")}
                  </p>
                  <div className="absolute top-full left-[80%] -translate-x-1/2 bg-green-500 p-2 rounded-full text-white opacity-0 group-hover:top-1/2 group-hover:opacity-100 transition-all duration-300 w-12 h-12 flex justify-center items-center">
                    <i className="fa-solid fa-play text-lg text-black"></i>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center mt-10">
                <p className="font-bold text-lg">
                  {t("artistDetail.empty1Playlist")} {name}{" "}
                  {t("artistDetail.empty2Playlist")}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xl font-bold">{t("artistDetail.allSong")}</p>
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
                    {music.thumbnail ? (
                      <img
                        src={music.thumbnail}
                        className="h-12 w-12 rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg flex justify-center items-center bg-[#242424]">
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
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center mt-10">
                <p className="font-bold text-lg">
                  {t("artistDetail.empty1Music")} {name}{" "}
                  {t("artistDetail.empty2Music")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalAddOpen && (
        <AddToPlaylist onClose={handleCloseAddModal} music={musicToAdd} />
      )}
    </section>
  );
}
