import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationFR from "./locale/fr.json";
import translationEN from "./locale/en.json";

const resources = {
  fr: { translation: translationFR },
  en: { translation: translationEN }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "fr", 
  interpolation: { escapeValue: false }
});

export default i18n;
