import React from 'react';
import {
  Navbar, Form, Card
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

  const Header = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const lang = i18n.resolvedLanguage;
    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    };

    return (
    <>
        <Card.Header className="d-flex justify-content-between align-items-center sticky-top bg-light">
          <Navbar expand="lg">
            <Navbar.Brand href="/">{t('header.title')}</Navbar.Brand>
          </Navbar>
          <Card.Text>
          <Form.Select size="sm" defaultValue={lang}>
            <option value="en" onClick={() => changeLanguage('en')}>English</option>
            <option value="ru" onClick={() => changeLanguage('ru')}>Русский</option>
          </Form.Select>
          </Card.Text>
        </Card.Header>
    </>
    );
  };
  export default Header;
  