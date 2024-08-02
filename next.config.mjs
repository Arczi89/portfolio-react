import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-fs-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const initI18n = async () => {
  try {
    await i18n
    .use(LanguageDetector)
    .use(HttpBackend)
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
          escapeValue: false,
        },
        backend: {
          ns: ['translation'],
          loadPath: 'locales/{{lng}}/{{ns}}.json',
        },
        react: {
          useSuspense: false,
        },
        defaultLocale: 'pl',
        locales: ['en', 'pl'],
      });
    console.log('i18next initialized');
  } catch (err) {
    console.error('i18next initialization failed', err);
  }
};

void initI18n();

const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl'],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,  
      fs: false,
    };
    
    return config;
  },
};

export default nextConfig;
