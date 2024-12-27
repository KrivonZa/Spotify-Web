import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import vi from "./locales/vi.json";

export const languageResources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: languageResources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
