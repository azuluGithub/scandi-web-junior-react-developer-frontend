export const CURRENCIES_TYPE = 'CURRENCIES_TYPE';
export const SELECTED_CURRENCY_TYPE = 'SELECTED_CURRENCY_TYPE';

export const currencyAction = (currencies) => ({
  type: CURRENCIES_TYPE,
  payload: currencies,
});

export const selectedCurrencyAction = (currency) => ({
  type: SELECTED_CURRENCY_TYPE,
  payload: currency,
});
