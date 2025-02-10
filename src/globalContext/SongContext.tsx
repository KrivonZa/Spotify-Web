import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { musicQueueThunk } from "../stores/musicManager/thunk";
import { useMusic } from "../hooks/useMusic";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

interface SongContextType {
  selectedMusic: any[];
  setSelectedMusic: (music: any[]) => void;
}

const SongContext = createContext<SongContextType>({
  selectedMusic: [],
  setSelectedMusic: () => {},
});

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMusic, setSelectedMusic] = useState<any[]>([]);
  const { musicQueue } = useMusic();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (Array.isArray(selectedMusic) && selectedMusic.length === 1) {
      const selectedSong = selectedMusic[0];
      dispatch(musicQueueThunk(selectedSong.id))
        .then(() => {
          const sortedQueue = [
            selectedSong,
            ...musicQueue.filter((song) => song.id !== selectedSong.id),
          ];
          setSelectedMusic(sortedQueue);
        })
        .catch((error) => {
          console.error("Failed to update music queue:", error);
        });
    }
  }, [selectedMusic, dispatch, musicQueue]);

  return (
    <SongContext.Provider value={{ selectedMusic, setSelectedMusic }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => useContext(SongContext);
