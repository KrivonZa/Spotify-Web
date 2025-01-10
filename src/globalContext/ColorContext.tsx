import { createContext, useContext, useState, ReactNode } from 'react';

interface ColorContextType {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

const ColorContext = createContext<ColorContextType>({
  primaryColor: '#383838',
  setPrimaryColor: () => {},
});

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [primaryColor, setPrimaryColor] = useState('#383838');

  return (
    <ColorContext.Provider value={{ primaryColor, setPrimaryColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
