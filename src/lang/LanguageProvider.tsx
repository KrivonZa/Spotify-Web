import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import i18n, { languageResources } from "./i18next";

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const supportedLanguages = Object.keys(languageResources);

  const getDefaultLanguage = () => {
    const browserLanguage = navigator.language.split("-")[0];
    return supportedLanguages.includes(browserLanguage) ? browserLanguage : "en";
  };

  const [language, setLanguage] = useState<string>(getDefaultLanguage());

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
