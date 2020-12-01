import * as scrollActionTypes from "../actions/scrollActions/scrollActionTypes";

interface ScrollState {
  scrollToFiatCalc: number;
  scrollToCryptoCalc: number;
  scrollToExchange: number;
  scrollToWhyUs: number;
  scrollToContacts: number;
}

const initialState: ScrollState = {
  scrollToFiatCalc: 0,
  scrollToCryptoCalc: 0,
  scrollToExchange: 0,
  scrollToWhyUs: 0,
  scrollToContacts: 0
};

const store = (state = initialState, action: scrollActionTypes.ScrollActionType): ScrollState => {
  switch (action.type) {
    case scrollActionTypes.SCROLL_TO_FIAT_CALC:
      return { ...state, scrollToFiatCalc: state.scrollToFiatCalc + 1 };

    case scrollActionTypes.SCROLL_TO_CRYPTO_CALC:
      return { ...state, scrollToCryptoCalc: state.scrollToCryptoCalc + 1 };

    case scrollActionTypes.SCROLL_TO_EXCHANGE:
      return { ...state, scrollToExchange: state.scrollToExchange + 1 };

    case scrollActionTypes.SCROLL_TO_WHY_US:
      return { ...state, scrollToWhyUs: state.scrollToWhyUs + 1 };

    case scrollActionTypes.SCROLL_TO_CONTACTS:
      return { ...state, scrollToContacts: state.scrollToContacts + 1 };

    default:
      return state;
  }
};

export default store;
