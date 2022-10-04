import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import CurrencyContext from '../contexts/CurrencyContext';
import { Form, Button, InputGroup, Card, Container, Row, Col} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Converter = () => {
    const { t } = useTranslation();
    const [ exchangeRates, ] = useContext(CurrencyContext);
    const [ amount, setAmount ] = useState(1);
    const [ rate, setRate ] = useState(0);

    const convertCurrency = (rate) => {
        setRate(rate);
    }

    const setDefault = () => {
        setRate(0); 
        setAmount(1);
    }

    const makeList = (arr) => {
        const keys = Object.keys(arr);
        return keys.map((item) => <option key={arr[item].ID} value={arr[item].CharCode} onClick={() => convertCurrency(arr[item].Value.toFixed(2) / arr[item].Nominal )}>{arr[item].CharCode} - {arr[item].Name}</option>);
    }
    const list = exchangeRates? makeList(exchangeRates.Valute): null;
    const result = amount * rate;
    const inputOnChange = (e) => {
        e.preventDefault();
        setAmount(e.target.value);
    }

    return (
        <>
        <Card.Body className="d-flex justify-content-around flex-column mb-3">
        <Container>
        <Form>
        <Row>
                <Col sm={6}>
                    <Form.Label>{t('converter.currencyselect')}</Form.Label>
                    <Form.Select>
                    <option value="default" onClick={() => setDefault()}>{t('converter.currencyselect')}</option>
                    {list}
                    </Form.Select> 
                </Col>
                <Col sm={2}>
                    <Form.Label>{t('converter.exchangeamount')}</Form.Label>
                    <Form.Control className="mr-5 ml-5" type="text" placeholder="Amount" value={amount} onChange={inputOnChange}></Form.Control>
                </Col>
                <Col sm={4}>
                    <Form.Label>{t('converter.exchangeresult')}</Form.Label>
                    <InputGroup.Text>{result.toFixed(2)} {t('converter.roubles')}</InputGroup.Text>
                </Col>
            </Row>


        </Form>

        </Container>
        
        <Button variant="outline-primary" className="align-self-sm-center"><Link to="/" style={{textDecoration: "none", color: "black"}}>{t('buttons.home')}</Link></Button>
        </Card.Body>

        </>

    )
}

export default Converter;