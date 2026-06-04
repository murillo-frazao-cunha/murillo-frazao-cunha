import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "./pt.json";
import en from "./en.json";
// Dentro do seu arquivo i18n/index.ts ou .js

i18n
    .use(initReactI18next)
    .init({
        resources: {
            pt: { translation: pt },
            en: { translation: en }
        },
        lng: typeof window !== 'undefined' ? localStorage.getItem('app-lng') || 'en' : 'en',
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;