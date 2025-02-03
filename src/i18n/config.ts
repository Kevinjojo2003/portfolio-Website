import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './languages/en';
import { es } from './languages/es';
import { fr } from './languages/fr';
import { zh } from './languages/zh';
import { de } from './languages/de';
import { hi } from './languages/hi';
import { ar } from './languages/ar';
import { pt } from './languages/pt';
import { ru } from './languages/ru';
import { ja } from './languages/ja';

const resources = {
  en,
  es,
  fr,
  zh,
  de,
  hi,
  ar,
  pt,
  ru,
  ja
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;