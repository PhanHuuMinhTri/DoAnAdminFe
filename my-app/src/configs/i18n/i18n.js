import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { LANGUAGE } from "../../constants/language";

import { en } from "./locales/en";
import { jp } from "./locales/jp";

console.log("jp", jp);

i18n
  .use(initReactI18next)
  .init({
    returnNull: false,
    fallbackLng: LANGUAGE.JP,
    debug: false,
    lng: localStorage.getItem("language"),
    resources: {
      en: {
        translation: en,
      },
      jp: {
        translation: jp,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .catch((error) => {
    throw error;
  });

const I18n = i18n;

export { I18n };
