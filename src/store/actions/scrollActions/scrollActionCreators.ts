import * as scrollActionTypes from "./scrollActionTypes";

export const scrollToFiatCalc = (): scrollActionTypes.ScrollToFiatCalc => ({
  type: scrollActionTypes.SCROLL_TO_FIAT_CALC
});

export const scrollToCryptoCalc = (): scrollActionTypes.ScrollToCryptoCalc => ({
  type: scrollActionTypes.SCROLL_TO_CRYPTO_CALC
});

export const scrollToExchange = (): scrollActionTypes.ScrollToExchange => ({
  type: scrollActionTypes.SCROLL_TO_EXCHANGE
});

export const scrollToWhyUs = (): scrollActionTypes.ScrollToWhyUs => ({
  type: scrollActionTypes.SCROLL_TO_WHY_US
});

export const scrollToContacts = (): scrollActionTypes.ScrollToContacts => ({
  type: scrollActionTypes.SCROLL_TO_CONTACTS
});
