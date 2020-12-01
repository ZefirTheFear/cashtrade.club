import { createStore, combineReducers } from "redux";

import fiatCurrencyReducer from "./reducers/fiatCurrencyReducer";
import cryptoCurrencyReducer from "./reducers/cryptoCurrencyReducer";
import mobileMenuReducer from "./reducers/mobileMenuReducer";
import scrollReducer from "./reducers/scrollReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const rootReducer = combineReducers({
  fiatCurrenciesState: fiatCurrencyReducer,
  cryptoCurrenciesState: cryptoCurrencyReducer,
  mobileMenuState: mobileMenuReducer,
  scrollState: scrollReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

export default store;
