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
          const currencyList1 = Object.keys(result.Valute);
          const defaultList = exchangeRates.currencyList.slice();
          const currencyList = defaultList.concat(currencyList1);
          setExchangeRates({...exchangeRates, ...result, currencyList});
        }
        fetchRates();
      },[]);

    const trend = (current, previous) => {
        if (current > previous) return ' ▲';
        if (current < previous) return ' ▼';
        return '';
      }

    const getCrossRate = (rate, nominal) => {
        const rateToRub = rate.toFixed(2) / nominal;
        const defaultRateToRub = exchangeRates.Valute[exchangeRates.defaultCurrency].Value.toFixed(2) / exchangeRates.Valute[exchangeRates.defaultCurrency].Nominal;
        return (rateToRub / defaultRateToRub).toFixed(3);

    }

    const makeList = (arr) => {
        const keys = Object.keys(arr);
        return keys.filter((key) => key !== exchangeRates.defaultCurrency)
        .map((item) => <tr key={arr[item].ID}>
        <td>{arr[item].NumCode}</td>
        <td>{arr[item].CharCode}</td>
        <td>{exchangeRates.defaultCurrency === "RUB" ? arr[item].Nominal : 1}</td>
        <td>{arr[item].Name}</td>
        <td>{exchangeRates.defaultCurrency === "RUB" ? arr[item].Value.toFixed(2) : getCrossRate(arr[item].Value, arr[item].Nominal)}</td>
        {exchangeRates.defaultCurrency === "RUB" && <td>{trend(arr[item].Value, arr[item].Previous)}</td>}
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
                    {exchangeRates.defaultCurrency === "RUB" && <th></th>}
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
