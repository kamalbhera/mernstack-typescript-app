import { FC, Suspense } from 'react';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['cookie'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export const MultiLanguageProvider: FC = ({ children }) => {
  return <Suspense fallback="">{children}</Suspense>;
};
