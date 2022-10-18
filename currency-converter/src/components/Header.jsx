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
    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    };

    const changeBaseCurrency = (currency) => {
      setExchangeRates({...exchangeRates, defaultCurrency: currency,});
    };
    const makeList = (arr) => {
      return arr.map((item, index) => <option key={index} value={item} onClick={() => changeBaseCurrency(item)}>{item}</option>);
  };
  const list = exchangeRates? makeList(exchangeRates.currencyList): null;

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
            onClick={() => changeLanguage('en')}
            onTouchEnd={() => changeLanguage('en')}
            >English</option>
            <option value="ru"
             onClick={() => changeLanguage('ru')}
             onTouchEnd={() => changeLanguage('en')}
             >Русский</option>
          </Form.Select>
          </Card.Text>
        </Card.Header>
    </>
    );
  };
  export default Header;
  