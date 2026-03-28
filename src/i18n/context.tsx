import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Language, translations } from './translations';

interface I18nContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.EN;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  // Default to English per user request ("do not impleemnt automatic language selector. set the default to english")
  const [lang, setLang] = useState<Language>('EN');

  const value = {
    lang,
    setLang,
    t: translations[lang],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
