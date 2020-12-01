import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TiArrowRepeat } from "react-icons/ti";

import ExchangeData from "../ExchangeData/ExchangeData";
import TableFiatCalculator from "../TableFiatCalculator/TableFiatCalculator";

import { RootState } from "../../store/store";
import * as fiatCurrencyActions from "../../store/actions/fiatCurrenciesActions/fiatCurrenciesActionCreators";

import "./FiatCalculator.scss";

const FiatCalculator: React.FC = () => {
  const dispatch = useDispatch();

  const currenciesFromCustomer = useSelector(
    (state: RootState) => state.fiatCurrenciesState.currenciesFromCustomer
  );
  const currenciesToCustomer = useSelector(
    (state: RootState) => state.fiatCurrenciesState.currenciesToCustomer
  );
  const currentCurrencyFromCustomer = useSelector(
    (state: RootState) => state.fiatCurrenciesState.currentCurrencyFromCustomer
  );
  const currentCurrencyToCustomer = useSelector(
    (state: RootState) => state.fiatCurrenciesState.currentCurrencyToCustomer
  );
  const currencyFromCustomerAmount = useSelector(
    (state: RootState) => state.fiatCurrenciesState.currencyFromCustomerAmount
  );
  const currencyToCustomerAmount = useSelector(
    (state: RootState) => state.fiatCurrenciesState.currencyToCustomerAmount
  );

  const changeCurrencyFromCustomer = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const currencyName = e.currentTarget.getAttribute("data-name")!;
      const newSelectedCurrency = currenciesFromCustomer.find(
        (currency) => currency.name === currencyName
      )!;
      dispatch(fiatCurrencyActions.setCurrentFiatCurrencyFromCustomer(newSelectedCurrency));
      // console.log("in progress");
    },
    [currenciesFromCustomer, dispatch]
  );

  const changeCurrencyToCustomer = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const currencyName = e.currentTarget.getAttribute("data-name")!;
      const newSelectedCurrency = currenciesToCustomer.find(
        (currency) => currency.name === currencyName
      )!;
      dispatch(fiatCurrencyActions.setCurrentFiatCurrencyToCustomer(newSelectedCurrency));
      // console.log("in progress");
    },
    [currenciesToCustomer, dispatch]
  );

  const changeCurrencyFromCustomerAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(fiatCurrencyActions.changeFiatCurrencyFromCustomerAmount(event.currentTarget.value));
    },
    [dispatch]
  );

  const changeCurrencyToCustomerAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(fiatCurrencyActions.changeFiatCurrencyToCustomerAmount(event.currentTarget.value));
    },
    [dispatch]
  );

  const swapCurrencies = useCallback(() => {
    dispatch(fiatCurrencyActions.swapFiatCurrencies());
  }, [dispatch]);

  return (
    <>
      <div className="crypto-calculator">
        <div className="crypto-calculator__desc">
          <p>
            У нас вы можете обменять валюту по лучшему курсу. Курс зависит от суммы. Операция на
            сумму выше эквивалента 40 000 грн считается оптовой.
          </p>
        </div>
        <div className="calculator">
          <ExchangeData
            title="вы продаете"
            options={currenciesFromCustomer}
            currentCurrency={currentCurrencyFromCustomer}
            value={currencyFromCustomerAmount}
            onChangeCurrency={changeCurrencyFromCustomer}
            onChangeInputAmount={changeCurrencyFromCustomerAmount}
          />
          <div className="calculator__swaper" onClick={swapCurrencies}>
            <TiArrowRepeat />
          </div>
          <ExchangeData
            title="вы покупаете"
            options={currenciesToCustomer}
            currentCurrency={currentCurrencyToCustomer}
            value={currencyToCustomerAmount}
            onChangeCurrency={changeCurrencyToCustomer}
            onChangeInputAmount={changeCurrencyToCustomerAmount}
          />
        </div>
        <TableFiatCalculator />
      </div>
    </>
  );
};

export default FiatCalculator;
