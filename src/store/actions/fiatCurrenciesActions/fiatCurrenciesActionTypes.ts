import { Currency } from "../../../models/currency";

export const SET_FIAT_CURRECNCIES_FROM_CUSTOMER = "SET_FIAT_CURRECNCIES_FROM_CUSTOMER";
export const SET_FIAT_CURRECNCIES_TO_CUSTOMER = "SET_FIAT_CURRECNCIES_TO_CUSTOMER";
export const SET_CURRENT_FIAT_CURRENCY_FROM_CUSTOMER = "SET_CURRENT_FIAT_CURRENCY_FROM_CUSTOMER";
export const SET_CURRENT_FIAT_CURRENCY_TO_CUSTOMER = "SET_CURRENT_FIAT_CURRENCY_TO_CUSTOMER";
export const SWAP_FIAT_CURRENCIES = "SWAP_FIAT_CURRENCIES";
export const CHANGE_FIAT_CURRENCY_FROM_CUSTOMER_AMOUNT =
  "CHANGE_FIAT_CURRENCY_FROM_CUSTOMER_AMOUNT";
export const CHANGE_FIAT_CURRENCY_TO_CUSTOMER_AMOUNT = "CHANGE_FIAT_CURRENCY_TO_CUSTOMER_AMOUNT";

export interface SetFiatCurrenciesFromCustomer {
  type: typeof SET_FIAT_CURRECNCIES_FROM_CUSTOMER;
  payload: {
    currencies: Currency[];
  };
}

export interface SetFiatCurrenciesToCustomer {
  type: typeof SET_FIAT_CURRECNCIES_TO_CUSTOMER;
  payload: {
    currencies: Currency[];
  };
}

export interface SetCurrentFiatCurrencyFromCustomer {
  type: typeof SET_CURRENT_FIAT_CURRENCY_FROM_CUSTOMER;
  payload: {
    currency: Currency;
  };
}

export interface SetCurrentFiatCurrencyToCustomer {
  type: typeof SET_CURRENT_FIAT_CURRENCY_TO_CUSTOMER;
  payload: {
    currency: Currency;
  };
}

export interface SwapFiatCurrencies {
  type: typeof SWAP_FIAT_CURRENCIES;
}

export interface ChangeFiatCurrencyFromCustomer {
  type: typeof CHANGE_FIAT_CURRENCY_FROM_CUSTOMER_AMOUNT;
  payload: {
    amount: string;
  };
}

export interface ChangeFiatCurrencyToCustomer {
  type: typeof CHANGE_FIAT_CURRENCY_TO_CUSTOMER_AMOUNT;
  payload: {
    amount: string;
  };
}

export type FiatCurrencyActionType =
  | SetFiatCurrenciesFromCustomer
  | SetFiatCurrenciesToCustomer
  | SetCurrentFiatCurrencyFromCustomer
  | SetCurrentFiatCurrencyToCustomer
  | SwapFiatCurrencies
  | ChangeFiatCurrencyFromCustomer
  | ChangeFiatCurrencyToCustomer;
