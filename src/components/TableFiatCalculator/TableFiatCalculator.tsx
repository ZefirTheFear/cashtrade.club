import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

import "./TableFiatCalculator.scss";

const CalculatorTable: React.FC = () => {
  const currencies = useSelector(
    (state: RootState) => state.fiatCurrenciesState.currenciesFromCustomer
  );

  const headerTableCurrencies = useMemo(() => {
    return ["валюта", "покупка, грн", "продажа, грн"];
  }, []);

  return (
    <div className="calculator-tables">
      <div className="calculator-tables__table">
        <h6>Оптовые курсы</h6>
        <table>
          <thead>
            <tr>
              {headerTableCurrencies.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => {
              if (currency.name !== "UAH") {
                return (
                  <tr key={currency.name}>
                    <td>
                      <div>
                        <img src={currency.img} alt={currency.name + "-logo"} />
                        {currency.name}
                      </div>
                    </td>
                    <td>{currency.valueBuy}</td>
                    <td>{currency.valueSale}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="calculator-tables__table">
        <h6>Розничные курсы</h6>
        <table>
          <thead>
            <tr>
              {headerTableCurrencies.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => {
              if (currency.name !== "UAH") {
                return (
                  <tr key={currency.name}>
                    <td>
                      <div>
                        <img src={currency.img} alt={currency.name + "-logo"} />
                        {currency.name}
                      </div>
                    </td>
                    <td>{currency.valueBuyRoz}</td>
                    <td>{currency.valueSaleRoz}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalculatorTable;
