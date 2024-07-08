import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import EN from './dictionary.en';
import FR from './dictionary.fr';

const resources = {
  en: {
    translation: EN,
  },
  fr: {
    translation: FR,
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
