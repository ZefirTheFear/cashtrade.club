import { Currency } from "../../../models/currency";

export const SET_CURRECNCIES_FROM_CUSTOMER = "SET_CURRECNCIES_FROM_CUSTOMER";
export const SET_CURRECNCIES_TO_CUSTOMER = "SET_CURRECNCIES_TO_CUSTOMER";
export const SET_CURRENT_CURRENCY_FROM_CUSTOMER = "SET_CURRENT_CURRENCY_FROM_CUSTOMER";
export const SET_CURRENT_CURRENCY_TO_CUSTOMER = "SET_CURRENT_CURRENCY_TO_CUSTOMER";
export const SWAP_CURRENCIES = "SWAP_CURRENCIES";
export const CHANGE_CURRENCY_FROM_CUSTOMER_AMOUNT = "CHANGE_CURRENCY_FROM_CUSTOMER_AMOUNT";
export const CHANGE_CURRENCY_TO_CUSTOMER_AMOUNT = "CHANGE_CURRENCY_TO_CUSTOMER_AMOUNT";
export const SET_PERCANTAGES = "SET_PERCANTAGES";

export type Percentage = {
  amountFrom: number;
  amountTo: number;
  percentBuyCrypto: number;
  percentSaleCrypto: number;
};

export interface SetCurrenciesFromCustomer {
  type: typeof SET_CURRECNCIES_FROM_CUSTOMER;
  payload: {
    currencies: Currency[];
  };
}

export interface SetCurrenciesToCustomer {
  type: typeof SET_CURRECNCIES_TO_CUSTOMER;
  payload: {
    currencies: Currency[];
  };
}

export interface SetCurrentCurrencyFromCustomer {
  type: typeof SET_CURRENT_CURRENCY_FROM_CUSTOMER;
  payload: {
    currency: Currency;
  };
}

export interface SetCurrentCurrencyToCustomer {
  type: typeof SET_CURRENT_CURRENCY_TO_CUSTOMER;
  payload: {
    currency: Currency;
  };
}

export interface SwapCurrencies {
  type: typeof SWAP_CURRENCIES;
}

export interface ChangeCurrencyFromCustomer {
  type: typeof CHANGE_CURRENCY_FROM_CUSTOMER_AMOUNT;
  payload: {
    amount: string;
  };
}

export interface ChangeCurrencyToCustomer {
  type: typeof CHANGE_CURRENCY_TO_CUSTOMER_AMOUNT;
  payload: {
    amount: string;
  };
}

export interface SetPercentages {
  type: typeof SET_PERCANTAGES;
  payload: {
    percentages: Percentage[];
  };
}

export type CryptoCurrencyActionType =
  | SetCurrenciesFromCustomer
  | SetCurrenciesToCustomer
  | SetCurrentCurrencyFromCustomer
  | SetCurrentCurrencyToCustomer
  | SwapCurrencies
  | ChangeCurrencyFromCustomer
  | ChangeCurrencyToCustomer
  | SetPercentages;
