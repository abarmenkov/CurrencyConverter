import React from 'react';
import ru from './locales/ru.js';
import en from './locales/en.js';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';

const InitApp = () => {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      fallbackLng: ['ru', 'en'],
      lng: 'ru',
      resources: {
        ru,
        en,
      },
    });

return (
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
)
}

export default InitApp;
