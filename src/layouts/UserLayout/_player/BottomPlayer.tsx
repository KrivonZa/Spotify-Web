import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useSong } from "../../../globalContext/SongContext";

const BottomPlayer = () => {
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { selectedMusic } = useSong();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

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
    setIsPlaying(false);
  };

  return (
    <div className="flex justify-between items-center px-4 py-4">
      <div className="flex items-center basis-1/4">
        <div className="h-14 w-14">
          <img
            src="https://i.scdn.co/image/ab67616d0000485158b561ead1631521fdcc47f1"
            className="rounded-lg"
            alt="cover"
          />
        </div>
        <div className="font-semibold mx-4">
          <div className="text-sm">AURORA</div>
          <div className="text-xs text-[#a0a0a0]">
            NUEKI, VØJ, Narvent, TOLCHONOV
          </div>
        </div>
        <button className="w-6 h-6 rounded-full border-2 border-[#a0a0a0] text-[#a0a0a0] flex justify-center items-center hover:border-white hover:text-white duration-200">
          <i className="fa-solid fa-plus text-xs"></i>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center basis-2/4 mx-10">
        <div className="flex justify-center items-center w-full gap-x-7 text-xl text-[#a0a0a0] mb-3">
          <i className="fa-solid fa-shuffle hover:text-white duration-200 cursor-pointer"></i>
          <i className="fa-solid fa-backward-step hover:text-white duration-200 cursor-pointer"></i>
          <div
            className="w-9 h-9 rounded-full bg-white transform hover:scale-105 hover:bg-slate-200 duration-200 flex justify-center items-center cursor-pointer"
            onClick={togglePlayPause}
          >
            <i
              className={`fa-solid ${
                isPlaying ? "fa-pause" : "fa-play"
              } text-black`}
            ></i>
          </div>
          <i className="fa-solid fa-forward-step hover:text-white duration-200 cursor-pointer"></i>
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
          src="https://music-media.trangiangkhanh.site/39648de7-c3cd-41dd-a193-e5bbc20164df_2025-01-24T11:25:43.650495389.mp3"
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
    </div>
  );
};

export default BottomPlayer;
