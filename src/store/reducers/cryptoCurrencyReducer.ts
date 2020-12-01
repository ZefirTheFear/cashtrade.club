import cloneDeep from "clone-deep";

import { convertCryptoCurrency, validateInput } from "../../utils/ts/helperFunctions";
import { Currency } from "../../models/currency";
import * as cryptoCurrencyActionTypes from "../actions/cryptoCurrencyActions/cryptoCurrencyActionTypes";

interface CurrencyState {
  isBuyCrypto: boolean;
  currenciesFromCustomer: Currency[];
  currenciesToCustomer: Currency[];
  currentCurrencyFromCustomer: Currency;
  currentCurrencyToCustomer: Currency;
  currencyFromCustomerAmount: string;
  currencyToCustomerAmount: string;
  percentages: cryptoCurrencyActionTypes.Percentage[];
  lastModifiedField: "FROM" | "TO";
}

const initialState: CurrencyState = {
  isBuyCrypto: true,
  currenciesFromCustomer: [],
  currenciesToCustomer: [],
  currentCurrencyFromCustomer: {
    name: "USD",
    valueSale: 1,
    valueBuy: 1,
    img: ""
  },
  currentCurrencyToCustomer: {
    name: "USD",
    valueSale: 1,
    valueBuy: 1,
    img: ""
  },
  currencyFromCustomerAmount: "",
  currencyToCustomerAmount: "",
  percentages: [],
  lastModifiedField: "FROM"
};

const currencyReducer = (
  state = initialState,
  action: cryptoCurrencyActionTypes.CryptoCurrencyActionType
): CurrencyState => {
  switch (action.type) {
    case cryptoCurrencyActionTypes.SET_CURRECNCIES_FROM_CUSTOMER:
      return { ...state, currenciesFromCustomer: action.payload.currencies };

    case cryptoCurrencyActionTypes.SET_CURRECNCIES_TO_CUSTOMER:
      return { ...state, currenciesToCustomer: action.payload.currencies };

    case cryptoCurrencyActionTypes.SET_CURRENT_CURRENCY_FROM_CUSTOMER:
      const newCurrencyFromCustomer = action.payload.currency;

      if (state.lastModifiedField === "FROM") {
        const newCurrencyToCustomerAmount = convertCryptoCurrency(
          state.currencyFromCustomerAmount,
          newCurrencyFromCustomer,
          state.currentCurrencyToCustomer,
          state.percentages,
          state.isBuyCrypto,
          "BUY"
        );
        return {
          ...state,
          currentCurrencyFromCustomer: action.payload.currency,
          currencyToCustomerAmount: newCurrencyToCustomerAmount
        };
      } else {
        const newCurrencyFromCustomerAmount = convertCryptoCurrency(
          state.currencyToCustomerAmount,
          state.currentCurrencyToCustomer,
          newCurrencyFromCustomer,
          state.percentages,
          state.isBuyCrypto,
          "SALE"
        );
        return {
          ...state,
          currentCurrencyFromCustomer: action.payload.currency,
          currencyFromCustomerAmount: newCurrencyFromCustomerAmount
        };
      }

    case cryptoCurrencyActionTypes.SET_CURRENT_CURRENCY_TO_CUSTOMER:
      const newCurrencyToCustomer = action.payload.currency;

      if (state.lastModifiedField === "FROM") {
        const newCurrencyToCustomerAmount = convertCryptoCurrency(
          state.currencyFromCustomerAmount,
          state.currentCurrencyFromCustomer,
          newCurrencyToCustomer,
          state.percentages,
          state.isBuyCrypto,
          "BUY"
        );
        return {
          ...state,
          currentCurrencyToCustomer: action.payload.currency,
          currencyToCustomerAmount: newCurrencyToCustomerAmount
        };
      } else {
        const newCurrencyFromCustomerAmount = convertCryptoCurrency(
          state.currencyToCustomerAmount,
          newCurrencyToCustomer,
          state.currentCurrencyFromCustomer,
          state.percentages,
          state.isBuyCrypto,
          "SALE"
        );
        return {
          ...state,
          currentCurrencyToCustomer: action.payload.currency,
          currencyFromCustomerAmount: newCurrencyFromCustomerAmount
        };
      }

    case cryptoCurrencyActionTypes.SWAP_CURRENCIES:
      const cloneCurrenciesFromCustomer = cloneDeep(state.currenciesFromCustomer);
      const cloneCurrenciesToCustomer = cloneDeep(state.currenciesToCustomer);
      const cloneCurrentCurrencyFromCustomer = cloneDeep(state.currentCurrencyFromCustomer);
      const cloneCurrentCurrencyToCustomer = cloneDeep(state.currentCurrencyToCustomer);
      return {
        ...state,
        currenciesFromCustomer: cloneCurrenciesToCustomer,
        currenciesToCustomer: cloneCurrenciesFromCustomer,
        currentCurrencyFromCustomer: cloneCurrentCurrencyToCustomer,
        currentCurrencyToCustomer: cloneCurrentCurrencyFromCustomer,
        currencyFromCustomerAmount:
          state.lastModifiedField === "FROM"
            ? convertCryptoCurrency(
                state.currencyFromCustomerAmount,
                state.currentCurrencyFromCustomer,
                state.currentCurrencyToCustomer,
                state.percentages,
                !state.isBuyCrypto,
                "SALE"
              )
            : state.currencyToCustomerAmount,
        currencyToCustomerAmount:
          state.lastModifiedField === "FROM"
            ? state.currencyFromCustomerAmount
            : convertCryptoCurrency(
                state.currencyToCustomerAmount,
                state.currentCurrencyToCustomer,
                state.currentCurrencyFromCustomer,
                state.percentages,
                !state.isBuyCrypto,
                "BUY"
              ),
        lastModifiedField: state.lastModifiedField === "FROM" ? "TO" : "FROM",
        isBuyCrypto: !state.isBuyCrypto
      };

    case cryptoCurrencyActionTypes.CHANGE_CURRENCY_FROM_CUSTOMER_AMOUNT: {
      const newCurrencyToCustomerAmount = convertCryptoCurrency(
        action.payload.amount,
        state.currentCurrencyFromCustomer,
        state.currentCurrencyToCustomer,
        state.percentages,
        state.isBuyCrypto,
        "BUY"
      );

      return {
        ...state,
        currencyFromCustomerAmount: validateInput(action.payload.amount),
        currencyToCustomerAmount: newCurrencyToCustomerAmount,
        lastModifiedField: "FROM"
      };
    }

    case cryptoCurrencyActionTypes.CHANGE_CURRENCY_TO_CUSTOMER_AMOUNT: {
      const newCurrencyFromCustomerAmount = convertCryptoCurrency(
        action.payload.amount,
        state.currentCurrencyToCustomer,
        state.currentCurrencyFromCustomer,
        state.percentages,
        state.isBuyCrypto,
        "SALE"
      );

      return {
        ...state,
        currencyFromCustomerAmount: newCurrencyFromCustomerAmount,
        currencyToCustomerAmount: validateInput(action.payload.amount),
        lastModifiedField: "TO"
      };
    }

    case cryptoCurrencyActionTypes.SET_PERCANTAGES:
      return { ...state, percentages: action.payload.percentages };

    default:
      return state;
  }
};

export default currencyReducer;
