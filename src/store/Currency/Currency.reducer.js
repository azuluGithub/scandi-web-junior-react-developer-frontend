import { CURRENCIES_TYPE, SELECTED_CURRENCY_TYPE } from './Currency.action';
import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';

const getCurrencies = () => {
  const currencies = BrowserDatabase.getItem('currencies');
  return currencies;
}

const initialCurrenciesState = () => ({
  currencies: [],
  selectedCurrency: {},
  currencyIsLoading: true,
  ...getCurrencies(),
});

const isSelectedCurrency = (currency) => {
  const currentCurrency = BrowserDatabase.getItem('selectedCurrency');
  return currentCurrency ? currentCurrency : { selectedCurrency: currency };
}

const setSelectedCurrency = (currency) => {
  BrowserDatabase.setItem('selectedCurrency', { selectedCurrency: currency });
}

const setCurrencies = (currencies) =>  {
  BrowserDatabase.setItem('currencies', currencies);
}

export const currenciesReducer = (state = initialCurrenciesState(), action = {}) => {
  const { type, payload } = action;

  switch (type) {

    case CURRENCIES_TYPE:
      const { currencies } = payload;

      setCurrencies(currencies);
      const selectedCurrency = isSelectedCurrency(currencies[0]);
      
      return { 
        ...state,
        currencies,
        ...selectedCurrency,
        currencyIsLoading: false,
      };

    case SELECTED_CURRENCY_TYPE:
      setSelectedCurrency(payload);

      return {
        ...state,
        ...payload,
        currencyIsLoading: false,
      }
      
    default:
      return state;
  }
}
