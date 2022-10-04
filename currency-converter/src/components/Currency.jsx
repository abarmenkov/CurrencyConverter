import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import CurrencyContext from '../contexts/CurrencyContext';
import { Card, Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';



const Currency = () => {
    const { t } = useTranslation();
    const [ exchangeRates, setExchangeRates] = useContext(CurrencyContext);

    useEffect(() => {
        const fetchRates = async () => {
          const rates = await axios('https://www.cbr-xml-daily.ru/daily_json.js');
          const result = rates.data;
          setExchangeRates(result);
        }
        fetchRates();
      }, [setExchangeRates])

    const trend = (current, previous) => {
        if (current > previous) return ' ▲';
        if (current < previous) return ' ▼';
        return '';
      }

    const makeList = (arr) => {
        const keys = Object.keys(arr);
        return keys.map((item) => <tr key={arr[item].ID}>
        <td>{arr[item].NumCode}</td>
        <td>{arr[item].CharCode}</td>
        <td>{arr[item].Nominal}</td>
        <td>{arr[item].Name}</td>
        <td>{arr[item].Value.toFixed(2)}</td>
        <td>{trend(arr[item].Value, arr[item].Previous)}</td>
        </tr>
        );
    }
    const list = exchangeRates? makeList(exchangeRates.Valute): null;

    return (
        <>
        <Card.Body className="d-flex justify-content-around flex-column mb-3">
            <Card.Title>{t('header.rates')}{exchangeRates?.Date}</Card.Title>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                    <th>{t('currencyTable.numcode')}</th>
                    <th>{t('currencyTable.charcode')}</th>
                    <th>{t('currencyTable.nominal')}</th>
                    <th>{t('currencyTable.name')}</th>
                    <th>{t('currencyTable.value')}</th>
                    <th></th>
                </tr>
              </thead>
              <tbody>
                {exchangeRates && list}
              </tbody>
            </Table>
            
            <Button variant="outline-primary" className="align-self-sm-center"><Link to="/converter" style={{textDecoration: "none", color: "black"}}>{t('buttons.calc')}</Link></Button>
            <br />
            <br />
            <br />

        </Card.Body>

        </>

    )
}
export default Currency;

