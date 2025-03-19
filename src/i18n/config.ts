
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
import { ml } from './languages/ml';
import { ta } from './languages/ta';
import { te } from './languages/te';
import { kn } from './languages/kn';
import { ms } from './languages/ms';
import { bn } from './languages/bn';
import { ko } from './languages/ko';
import { vi } from './languages/vi';
import { tr } from './languages/tr';
import { it } from './languages/it';

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
  ja,
  ml,
  ta,
  te,
  kn,
  ms,
  bn,
  ko,
  vi,
  tr,
  it
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
