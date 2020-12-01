import cloneDeep from "clone-deep";

import { convertFiatCurrency, validateInput } from "../../utils/ts/helperFunctions";
import { Currency } from "../../models/currency";
import * as fiatCurrencyActionTypes from "../actions/fiatCurrenciesActions/fiatCurrenciesActionTypes";

interface CurrencyState {
  currenciesFromCustomer: Currency[];
  currenciesToCustomer: Currency[];
  currentCurrencyFromCustomer: Currency;
  currentCurrencyToCustomer: Currency;
  currencyFromCustomerAmount: string;
  currencyToCustomerAmount: string;
  lastModifiedField: "FROM" | "TO";
}

const initialState: CurrencyState = {
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
  lastModifiedField: "FROM"
};

const currencyReducer = (
  state = initialState,
  action: fiatCurrencyActionTypes.FiatCurrencyActionType
): CurrencyState => {
  switch (action.type) {
    case fiatCurrencyActionTypes.SET_FIAT_CURRECNCIES_FROM_CUSTOMER:
      return { ...state, currenciesFromCustomer: action.payload.currencies };

    case fiatCurrencyActionTypes.SET_FIAT_CURRECNCIES_TO_CUSTOMER:
      return { ...state, currenciesToCustomer: action.payload.currencies };

    case fiatCurrencyActionTypes.SET_CURRENT_FIAT_CURRENCY_FROM_CUSTOMER:
      const newCurrencyFromCustomer = action.payload.currency;

      if (state.lastModifiedField === "FROM") {
        const newCurrencyToCustomerAmount = convertFiatCurrency(
          state.currencyFromCustomerAmount,
          newCurrencyFromCustomer,
          state.currentCurrencyToCustomer,
          "BUY"
        );
        return {
          ...state,
          currentCurrencyFromCustomer: action.payload.currency,
          currencyToCustomerAmount: newCurrencyToCustomerAmount
        };
      } else {
        const newCurrencyFromCustomerAmount = convertFiatCurrency(
          state.currencyToCustomerAmount,
          state.currentCurrencyToCustomer,
          newCurrencyFromCustomer,
          "SALE"
        );
        return {
          ...state,
          currentCurrencyFromCustomer: action.payload.currency,
          currencyFromCustomerAmount: newCurrencyFromCustomerAmount
        };
      }

    case fiatCurrencyActionTypes.SET_CURRENT_FIAT_CURRENCY_TO_CUSTOMER:
      const newCurrencyToCustomer = action.payload.currency;

      if (state.lastModifiedField === "FROM") {
        const newCurrencyToCustomerAmount = convertFiatCurrency(
          state.currencyFromCustomerAmount,
          state.currentCurrencyFromCustomer,
          newCurrencyToCustomer,
          "BUY"
        );
        return {
          ...state,
          currentCurrencyToCustomer: action.payload.currency,
          currencyToCustomerAmount: newCurrencyToCustomerAmount
        };
      } else {
        const newCurrencyFromCustomerAmount = convertFiatCurrency(
          state.currencyToCustomerAmount,
          newCurrencyToCustomer,
          state.currentCurrencyFromCustomer,
          "SALE"
        );
        return {
          ...state,
          currentCurrencyToCustomer: action.payload.currency,
          currencyFromCustomerAmount: newCurrencyFromCustomerAmount
        };
      }

    case fiatCurrencyActionTypes.SWAP_FIAT_CURRENCIES:
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
            ? convertFiatCurrency(
                state.currencyFromCustomerAmount,
                state.currentCurrencyFromCustomer,
                state.currentCurrencyToCustomer,
                "SALE"
              )
            : state.currencyToCustomerAmount,
        currencyToCustomerAmount:
          state.lastModifiedField === "FROM"
            ? state.currencyFromCustomerAmount
            : convertFiatCurrency(
                state.currencyToCustomerAmount,
                state.currentCurrencyToCustomer,
                state.currentCurrencyFromCustomer,
                "BUY"
              ),
        lastModifiedField: state.lastModifiedField === "FROM" ? "TO" : "FROM"
      };

    case fiatCurrencyActionTypes.CHANGE_FIAT_CURRENCY_FROM_CUSTOMER_AMOUNT: {
      const newCurrencyToCustomerAmount = convertFiatCurrency(
        action.payload.amount,
        state.currentCurrencyFromCustomer,
        state.currentCurrencyToCustomer,
        "BUY"
      );

      return {
        ...state,
        currencyFromCustomerAmount: validateInput(action.payload.amount),
        currencyToCustomerAmount: newCurrencyToCustomerAmount,
        lastModifiedField: "FROM"
      };
    }

    case fiatCurrencyActionTypes.CHANGE_FIAT_CURRENCY_TO_CUSTOMER_AMOUNT: {
      const newCurrencyFromCustomerAmount = convertFiatCurrency(
        action.payload.amount,
        state.currentCurrencyToCustomer,
        state.currentCurrencyFromCustomer,
        "SALE"
      );

      return {
        ...state,
        currencyFromCustomerAmount: newCurrencyFromCustomerAmount,
        currencyToCustomerAmount: validateInput(action.payload.amount),
        lastModifiedField: "TO"
      };
    }

    default:
      return state;
  }
};

export default currencyReducer;
