import React from 'react';
import {
  Card
} from 'react-bootstrap';
//import { useTranslation } from 'react-i18next';

const Footer = () => {

return (
    <>
        <Card.Footer className="d-flex justify-content-between align-items-center text-muted footer mt-auto py-3 bg-light">
        <Card.Link href="https://www.cbr-xml-daily.ru/" target="_blank" style={{textDecoration: "none",}}>API для курсов ЦБ РФ</Card.Link>
        <Card.Text>© abarmenkov, 2022</Card.Text>
        </Card.Footer>
    </>
)
}

export default Footer;