import { createContext, useContext, useState, ReactNode } from "react";

interface SongContextType {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  selectedMusic: any;
  setSelectedMusic: (music: any) => void;
}

const SongContext = createContext<SongContextType>({
  primaryColor: "#383838",
  setPrimaryColor: () => {},
  selectedMusic: null,
  setSelectedMusic: () => {},
});

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [primaryColor, setPrimaryColor] = useState("#383838");
  const [selectedMusic, setSelectedMusic] = useState(null);

  return (
    <SongContext.Provider value={{ primaryColor, setPrimaryColor, selectedMusic, setSelectedMusic }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => useContext(SongContext);
