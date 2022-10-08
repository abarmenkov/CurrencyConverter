import React, { StrictMode, useEffect, useContext } from 'react';
import ru from './locales/ru.js';
import en from './locales/en.js';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import CurrencyContext from './contexts/CurrencyContext.js';
import axios from 'axios';

const InitApp = () => {
  const [ exchangeRates, setExchangeRates] = useContext(CurrencyContext);

  useEffect(() => {
      const fetchRates = async () => {
        const rates = await axios('https://www.cbr-xml-daily.ru/daily_json.js');
        const result = rates.data;
        const currencyList1 = Object.keys(result.Valute);
        const defaultList = exchangeRates.currencyList.slice();
        const currencyList = defaultList.concat(currencyList1);
        setExchangeRates({...exchangeRates, ...result, currencyList});
      }
      fetchRates();
    },[]);

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
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
  </StrictMode>
)
}

export default InitApp;
