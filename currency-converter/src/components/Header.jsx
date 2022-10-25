import React, { useContext, useState, useEffect } from 'react';
import {
  Navbar, Form, Card
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CurrencyContext from '../contexts/CurrencyContext';

  const Header = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [ exchangeRates, setExchangeRates] = useContext(CurrencyContext);
    const [ lang, setLang ] = useState(i18n.resolvedLanguage);

    // const lang = i18n.resolvedLanguage;
    useEffect(() => {
      i18n.changeLanguage(lang);
    }, [i18n, lang])

    const changeLanguage = (e) => {
      e.preventDefault();
      setLang(e.target.value);
      //i18n.changeLanguage(e.target.value);
    };

    const changeBaseCurrency = (e) => {
      e.preventDefault();
      setExchangeRates({...exchangeRates, defaultCurrency: e.target.value,});
      console.log(i18n.resolvedLanguage);
    };

    const makeList = (arr) => {
      return arr.map((item, index) => <option key={index} value={item}>{item}</option>);
    };

    const list = exchangeRates? makeList(exchangeRates.currencyList): null;

    return (
    <>
        <Card.Header className="d-flex justify-content-between align-items-center sticky-top bg-light">
          <Navbar expand="lg">
            <Navbar.Brand href="/">{t('header.title')}</Navbar.Brand>
          </Navbar>
          <Card.Text className="d-flex justify-content-between">
          <Form className="d-flex justify-content-between align-items-center">
          <Form.Select size="sm" defaultValue="RUB" onChange={changeBaseCurrency}>
            {list}
          </Form.Select>
          <Form.Select size="sm" defaultValue={lang} onChange={changeLanguage}>
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </Form.Select>
          </Form>
          </Card.Text>
        </Card.Header>
    </>
    );
  };
  export default Header;
  