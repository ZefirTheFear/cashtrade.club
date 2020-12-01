import React, { useState, useRef, useCallback, useEffect } from "react";

import { FaAngleDown } from "react-icons/fa";

import { Currency } from "../../models/currency";

import "./ExchangeData.scss";

interface ExchangeDataProps {
  title: string;
  options: Currency[];
  currentCurrency: Currency;
  value: string;
  onChangeCurrency: (e: React.MouseEvent<HTMLDivElement>) => void;
  onChangeInputAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExchangeData: React.FC<ExchangeDataProps> = ({
  title,
  options,
  currentCurrency,
  value,
  onChangeCurrency,
  onChangeInputAmount
}) => {
  const optionsListElem = useRef<HTMLDivElement>(null!);
  const selectedElem = useRef<HTMLDivElement>(null!);

  const [isOpenedOptions, setIsOpenedOptions] = useState(false);

  const toggleIsOpenedOptions = useCallback(() => {
    const elem = optionsListElem.current;
    if (isOpenedOptions) {
      elem.style.borderWidth = "0";
      elem.style.marginTop = "";
      elem.style.height = "0";
    } else {
      const borderWidth = 1;
      elem.style.borderWidth = `${borderWidth}px`;
      elem.style.marginTop = "0.5rem";
      elem.style.height = elem.scrollHeight + borderWidth * 2 + "px";
    }

    setIsOpenedOptions((prevState) => !prevState);
  }, [isOpenedOptions]);

  const closeCurrenciesOptions = useCallback(() => {
    const elem = optionsListElem.current;
    elem.style.borderWidth = "0";
    elem.style.height = "0";
    elem.style.marginTop = "";
    setIsOpenedOptions(false);
  }, []);

  const closeOpenedOptions = useCallback(
    (e: MouseEvent) => {
      let element = e.target as HTMLElement;
      while (element !== document.body) {
        if (element === selectedElem.current) {
          return;
        }
        const parentElement = element.parentElement;
        if (parentElement) {
          element = parentElement;
        } else {
          return;
        }
      }
      if (isOpenedOptions) {
        closeCurrenciesOptions();
      }
    },
    [closeCurrenciesOptions, isOpenedOptions]
  );

  useEffect(() => {
    window.addEventListener("click", closeOpenedOptions);
    return () => {
      window.removeEventListener("click", closeOpenedOptions);
    };
  }, [closeOpenedOptions]);

  return (
    <div className="exchange-data">
      <div className="exchange-data__title">{title}</div>
      <div className="exchange-data__selector">
        <div className="exchange-data__selected" onClick={toggleIsOpenedOptions} ref={selectedElem}>
          <img
            className="exchange-data__currency-img"
            src={currentCurrency.img}
            alt={currentCurrency.name + "-logo"}
          />
          <span className="exchange-data__currency-name">{currentCurrency.name}</span>
          <span
            className={
              "exchange-data__select-arrow" +
              (isOpenedOptions ? " exchange-data__select-arrow_is-opened" : "")
            }
          >
            <FaAngleDown />
          </span>
        </div>
        <div className="exchange-data__select-options" ref={optionsListElem}>
          {options.map((item) => (
            <div
              className="exchange-data__select-options-item"
              key={item.name}
              data-name={item.name}
              onClick={onChangeCurrency}
            >
              <img
                className="exchange-data__currency-img"
                src={item.img}
                alt={item.name + "-logo"}
              />
              <span className="exchange-data__currency-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <input
        type="number"
        placeholder="0.00"
        className="exchange-data__input"
        value={value}
        onChange={onChangeInputAmount}
      />
    </div>
  );
};

export default ExchangeData;
