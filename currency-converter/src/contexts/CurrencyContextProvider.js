import { useState } from "react";
import CurrencyContext from "./CurrencyContext";

const CurrencyContextProvider = ({ children}) => {
    const initialState = {
        Date: "",
        Valute: {
            Valute: {
                ID: 0,
                CharCode: "loading",
                Value: 0,
                Name: "loading",
                Previous: 0,
                Nominal: 0,
                NumCode: 0,
            }
        },
        defaultCurrency: "RUB",
        currencyList: ["RUB"],

    };
    const [ exchangeRates, setExchangeRates] = useState(initialState);
    return (
        <CurrencyContext.Provider value={[exchangeRates, setExchangeRates]}>
            {children}
        </CurrencyContext.Provider>
    )
};

export default CurrencyContextProvider;
