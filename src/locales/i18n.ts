import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import tranEn from "./Files/en.json";
import tranKo from "./Files/ko.json";

export const languages = ["en", "ko"] as const;

export type Languages = (typeof languages)[number];

const resources = {
  en: { translation: tranEn },
  ko: { translation: tranKo },
};

// 초기 언어는 브라우저에서 감지하거나, 이전에 로컬스토리지에 저장된 언어를 사용
const userLanguage = window.navigator.language.split("-")[0];
const savedLanguage = localStorage.getItem("language");

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage || userLanguage || "ko",
  fallbackLng: "ko",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;
