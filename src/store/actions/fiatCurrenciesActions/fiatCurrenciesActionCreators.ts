import { Currency } from "../../../models/currency";
import * as fiatCurrencyActionTypes from "./fiatCurrenciesActionTypes";

export const setFiatCurrenciesFromCustomer = (
  currencies: Currency[]
): fiatCurrencyActionTypes.SetFiatCurrenciesFromCustomer => ({
  type: fiatCurrencyActionTypes.SET_FIAT_CURRECNCIES_FROM_CUSTOMER,
  payload: {
    currencies
  }
});

export const setFiatCurrenciesToCustomer = (
  currencies: Currency[]
): fiatCurrencyActionTypes.SetFiatCurrenciesToCustomer => ({
  type: fiatCurrencyActionTypes.SET_FIAT_CURRECNCIES_TO_CUSTOMER,
  payload: {
    currencies
  }
});

export const setCurrentFiatCurrencyFromCustomer = (
  currency: Currency
): fiatCurrencyActionTypes.SetCurrentFiatCurrencyFromCustomer => ({
  type: fiatCurrencyActionTypes.SET_CURRENT_FIAT_CURRENCY_FROM_CUSTOMER,
  payload: {
    currency
  }
});

export const setCurrentFiatCurrencyToCustomer = (
  currency: Currency
): fiatCurrencyActionTypes.SetCurrentFiatCurrencyToCustomer => ({
  type: fiatCurrencyActionTypes.SET_CURRENT_FIAT_CURRENCY_TO_CUSTOMER,
  payload: {
    currency
  }
});

export const swapFiatCurrencies = (): fiatCurrencyActionTypes.SwapFiatCurrencies => ({
  type: fiatCurrencyActionTypes.SWAP_FIAT_CURRENCIES
});

export const changeFiatCurrencyFromCustomerAmount = (
  amount: string
): fiatCurrencyActionTypes.ChangeFiatCurrencyFromCustomer => ({
  type: fiatCurrencyActionTypes.CHANGE_FIAT_CURRENCY_FROM_CUSTOMER_AMOUNT,
  payload: {
    amount
  }
});

export const changeFiatCurrencyToCustomerAmount = (
  amount: string
): fiatCurrencyActionTypes.ChangeFiatCurrencyToCustomer => ({
  type: fiatCurrencyActionTypes.CHANGE_FIAT_CURRENCY_TO_CUSTOMER_AMOUNT,
  payload: {
    amount
  }
});
