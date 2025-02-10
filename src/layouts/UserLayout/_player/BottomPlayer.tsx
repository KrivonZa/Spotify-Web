import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
// import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import AddToPlaylist from "../../../components/ArtistComponent/AddToPlaylist";
import { useSong } from "../../../globalContext/SongContext";
import { getMusic } from "../../../types/music";

const BottomPlayer = () => {
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { selectedMusic, setSelectedMusic } = useSong();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [musicToAdd, setMusicToAdd] = useState<getMusic | null>(null);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    if (!selectedMusic || selectedMusic.length === 0) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }
    const currentMusic = selectedMusic[currentIndex] || selectedMusic[0];

    if (currentMusic?.musicUrl && audioRef.current) {
      audioRef.current.src = currentMusic.musicUrl;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [selectedMusic, currentIndex]);

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(100);
      if (audioRef.current) audioRef.current.volume = 1;
    } else {
      setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    console.log("new", newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      console.log("old", audioRef.current.currentTime);
    }
    setCurrentTime(newTime);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return "fa-volume-xmark";
    if (volume <= 75) return "fa-volume-low";
    return "fa-volume-high";
  };

  const handleEnded = () => {
    if (selectedMusic.length === 1) {
      setIsPlaying(false);
      return;
    }

    if (currentIndex < selectedMusic.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }; //Cái này là chơi hết list sẽ tự động lặp lại

  // const handleEnded = () => {
  //   if (selectedMusic.length === 1) {
  //     setIsPlaying(false);
  //     return;
  //   }
  //   if (currentIndex < selectedMusic.length - 1) {
  //     setCurrentIndex((prevIndex) => prevIndex + 1);
  //   } else {
  //     setIsPlaying(false);
  //   }
  // }; Cái này là chơi hết list sẽ dừng

  const handlePrevious = () => {
    if (selectedMusic.length > 1) {
      if (currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      } else {
        setCurrentIndex(selectedMusic.length - 1);
      }
    }
  };

  const handleNext = () => {
    if (selectedMusic.length > 1) {
      if (currentIndex < selectedMusic.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }
  };

  //Trộn nhạc lên nào các cháu ơi!!
  const shufflePlaylist = () => {
    if (selectedMusic.length > 1) {
      const shuffled = [...selectedMusic];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [
          shuffled[randomIndex],
          shuffled[i],
        ];
      }
      setSelectedMusic(shuffled);
      setCurrentIndex(0);
    }
  };

  const handleOpenAddModal = (music: getMusic) => {
    setMusicToAdd(music);
    setIsModalAddOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsModalAddOpen(false);
    setMusicToAdd(null);
  };

  return (
    <div className="flex justify-between items-center px-4 py-4">
      <div className="flex items-center basis-1/4">
        {selectedMusic[currentIndex]?.thumbnail ? (
          <div className="h-14 w-14">
            <img
              src={selectedMusic[currentIndex]?.thumbnail}
              className="rounded-lg"
              alt="cover"
            />
          </div>
        ) : (
          <div className="w-14 h-14 object-cover shadow-xl flex justify-center items-center bg-[#242424] rounded-lg">
            <i className="fa-solid fa-music text-gray-400 text-xl"></i>
          </div>
        )}
        {selectedMusic ? (
          <div className="font-semibold mx-4">
            <div className="text-sm">
              {selectedMusic[currentIndex]?.musicName}
            </div>

            {selectedMusic[currentIndex]?.artistCollaboration && (
              <div className="mt-1">
                {selectedMusic[currentIndex].artistCollaboration
                  .map((artist: any) => artist.account?.nickname)
                  .join(", ")}{" "}
              </div>
            )}
          </div>
        ) : null}

        {selectedMusic.length > 0 && (
          <button
            className="w-6 h-6 rounded-full border-2 border-[#a0a0a0] text-[#a0a0a0] flex justify-center items-center hover:border-white hover:text-white duration-200"
            onClick={() => handleOpenAddModal(selectedMusic?.[currentIndex])}
          >
            <i className="fa-solid fa-plus text-xs"></i>
          </button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center basis-2/4 mx-10">
        <div className="flex justify-center items-center w-full gap-x-7 text-xl text-[#a0a0a0] mb-3">
          <i
            className="fa-solid fa-shuffle hover:text-white duration-200 cursor-pointer"
            onClick={shufflePlaylist}
          ></i>
          <i
            className="fa-solid fa-backward-step hover:text-white duration-200 cursor-pointer"
            onClick={handlePrevious}
          ></i>
          <div
            className={`w-9 h-9 rounded-full transform hover:scale-105 duration-200 flex justify-center items-center ${
              selectedMusic.length > 0
                ? "bg-white cursor-pointer hover:bg-slate-200"
                : "bg-gray-600 cursor-not-allowed hover:bg-gray-400"
            }`}
            onClick={selectedMusic.length > 0 ? togglePlayPause : undefined}
          >
            <i
              className={`fa-solid ${
                isPlaying ? "fa-pause" : "fa-play"
              } text-black`}
            ></i>
          </div>
          <i
            className="fa-solid fa-forward-step hover:text-white duration-200 cursor-pointer"
            onClick={handleNext}
          ></i>
          <i
            className={`fa-solid fa-repeat ${
              isLooping ? "text-green-400" : "text-[#a0a0a0]"
            } hover:text-white duration-200 cursor-pointer`}
            onClick={toggleLoop}
          ></i>
        </div>
        <div className="flex items-center w-full">
          <span className="text-xs text-[#a0a0a0]">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            className="flex-grow mx-2"
            min="0"
            max={duration}
            value={currentTime}
            step="0.1"
            onChange={handleSeek}
          />
          <span className="text-xs text-[#a0a0a0]">{formatTime(duration)}</span>
        </div>
        <audio
          ref={audioRef}
          src={selectedMusic?.[currentIndex]?.musicUrl || ""}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        ></audio>
      </div>
      <div className="grid grid-flow-col justify-between gap-x-5 text-[#a0a0a0] basis-1/4">
        <i className="fa-solid fa-music hover:text-white duration-200 cursor-pointer"></i>
        <i className="fa-solid fa-microphone hover:text-white duration-200 cursor-pointer"></i>
        <i className="fa-solid fa-list hover:text-white duration-200 cursor-pointer"></i>
        <i className="fa-solid fa-mobile hover:text-white duration-200 cursor-pointer"></i>
        <div className="grid grid-flow-col items-center gap-x-2 text-white">
          <div className="w-6 flex justify-center">
            <i
              className={`fa-solid ${getVolumeIcon()} cursor-pointer hover:text-white duration-200`}
              onClick={toggleMute}
            ></i>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            className="w-36 h-1 cursor-pointer"
            onChange={handleVolumeChange}
          />
        </div>
        <i className="fa-solid fa-square hover:text-white duration-200 cursor-pointer"></i>
        <i className="fa-solid fa-down-left-and-up-right-to-center hover:text-white duration-200 cursor-pointer"></i>
      </div>
      {isModalAddOpen && (
        <AddToPlaylist onClose={handleCloseAddModal} music={musicToAdd} />
      )}
    </div>
  );
};

export default BottomPlayer;
