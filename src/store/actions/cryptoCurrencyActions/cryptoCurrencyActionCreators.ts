import { Currency } from "../../../models/currency";
import * as cryptoCurrencyActionTypes from "./cryptoCurrencyActionTypes";

export const setCurrenciesFromCustomer = (
  currencies: Currency[]
): cryptoCurrencyActionTypes.SetCurrenciesFromCustomer => ({
  type: cryptoCurrencyActionTypes.SET_CURRECNCIES_FROM_CUSTOMER,
  payload: {
    currencies
  }
});

export const setCurrenciesToCustomer = (
  currencies: Currency[]
): cryptoCurrencyActionTypes.SetCurrenciesToCustomer => ({
  type: cryptoCurrencyActionTypes.SET_CURRECNCIES_TO_CUSTOMER,
  payload: {
    currencies
  }
});

export const setCurrentCurrencyFromCustomer = (
  currency: Currency
): cryptoCurrencyActionTypes.SetCurrentCurrencyFromCustomer => ({
  type: cryptoCurrencyActionTypes.SET_CURRENT_CURRENCY_FROM_CUSTOMER,
  payload: {
    currency
  }
});

export const setCurrentCurrencyToCustomer = (
  currency: Currency
): cryptoCurrencyActionTypes.SetCurrentCurrencyToCustomer => ({
  type: cryptoCurrencyActionTypes.SET_CURRENT_CURRENCY_TO_CUSTOMER,
  payload: {
    currency
  }
});

export const swapCurrencies = (): cryptoCurrencyActionTypes.SwapCurrencies => ({
  type: cryptoCurrencyActionTypes.SWAP_CURRENCIES
});

export const changeCurrencyFromCustomerAmount = (
  amount: string
): cryptoCurrencyActionTypes.ChangeCurrencyFromCustomer => ({
  type: cryptoCurrencyActionTypes.CHANGE_CURRENCY_FROM_CUSTOMER_AMOUNT,
  payload: {
    amount
  }
});

export const changeCurrencyToCustomerAmount = (
  amount: string
): cryptoCurrencyActionTypes.ChangeCurrencyToCustomer => ({
  type: cryptoCurrencyActionTypes.CHANGE_CURRENCY_TO_CUSTOMER_AMOUNT,
  payload: {
    amount
  }
});

export const setPercentages = (
  percentages: cryptoCurrencyActionTypes.Percentage[]
): cryptoCurrencyActionTypes.SetPercentages => ({
  type: cryptoCurrencyActionTypes.SET_PERCANTAGES,
  payload: {
    percentages
  }
});
