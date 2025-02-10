import { createContext, useContext, useState, ReactNode } from "react";

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

  return (
    <SongContext.Provider value={{ selectedMusic, setSelectedMusic }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => useContext(SongContext);
