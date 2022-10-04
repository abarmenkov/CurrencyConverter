import React, { StrictMode } from 'react';
import ru from './locales/ru.js';
import en from './locales/en.js';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import CurrencyContextProvider from './contexts/CurrencyContextProvider';


const initApp = () => {
    const i18n = i18next.createInstance();
    i18n
      .use(initReactI18next)
      .init({
        fallbackLng: 'ru',
        lng: 'ru',
        resources: {
          ru,
          en,
        },
      });

return (
  <StrictMode>
    <CurrencyContextProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </CurrencyContextProvider>
  </StrictMode>


)
}

export default initApp;
