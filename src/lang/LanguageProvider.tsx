import i18next from 'i18next';
import vi from './locales/vi.json';
import en from './locales/en.json';
import { createContext, useContext, useEffect, useState } from 'react';

// Đăng ký các ngôn ngữ trước khi khởi tạo
const resources = {
  vi: { translation: vi },
  en: { translation: en }
};

i18next.init({
  lng: 'vi', // ngôn ngữ mặc định
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  supportedLngs: ['en', 'vi'], // thêm danh sách ngôn ngữ được hỗ trợ
}, (err) => {
  if (err) console.error('i18next initialization error:', err);
});

const LanguageContext = createContext<{
  i18next: typeof i18next;
  locale: string;
  switchLanguage: (newLocale: string) => void;
}>({} as any);

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState(i18next.language);

  useEffect(() => {
    i18next.changeLanguage(locale);
  }, [locale]);

  const switchLanguage = (newLocale: string) => {
    if (resources[newLocale as keyof typeof resources]) {
      setLocale(newLocale);
    } else {
      console.error(`Language ${newLocale} not supported`);
    }
  };

  return (
    <LanguageContext.Provider value={{ i18next, locale, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

export { i18next };
export default LanguageProvider;
