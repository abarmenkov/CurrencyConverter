import React, { useContext } from 'react';
import {
  Navbar, Form, Card
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CurrencyContext from '../contexts/CurrencyContext';

  const Header = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [ exchangeRates, setExchangeRates] = useContext(CurrencyContext);

    const lang = i18n.resolvedLanguage;
    /*const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    };*/

    const changeLanguage = (e) => {
      e.preventDefault();
      e.stopPropagation();
      i18n.changeLanguage(e.target.value);
    };

    const changeBaseCurrency = (currency) => {
      setExchangeRates({...exchangeRates, defaultCurrency: currency,});
    };
    const makeList = (arr) => {
      return arr.map((item, index) => <option key={index} value={item} onClick={() => changeBaseCurrency(item)}>{item}</option>);
  };
  const list = exchangeRates? makeList(exchangeRates.currencyList): null;
  /*if (typeof document !== 'undefined') {
    var isTouch = 'ontouchstart' in document.documentElement;
    console.log(isTouch);
  }*/

    return (
    <>
        <Card.Header className="d-flex justify-content-between align-items-center sticky-top bg-light">
          <Navbar expand="lg">
            <Navbar.Brand href="/">{t('header.title')}</Navbar.Brand>
          </Navbar>
          <Card.Text className="d-flex justify-content-between">
          <Form.Select defaultValue="RUB">
            {list}
          </Form.Select>

          <Form.Select size="sm" defaultValue={lang}>
            <option value="en"
            //onClick={isTouch ? undefined : () => changeLanguage('en')}
            //onClick={() => changeLanguage('en')}
            onClick={changeLanguage}
            >English</option>
            <option value="ru"
             //onClick={isTouch ? undefined : () => changeLanguage('ru')}
             //onClick={() => changeLanguage('ru')}
             onClick={changeLanguage}
             >Русский</option>
          </Form.Select>
          </Card.Text>
        </Card.Header>
    </>
    );
  };
  export default Header;
  