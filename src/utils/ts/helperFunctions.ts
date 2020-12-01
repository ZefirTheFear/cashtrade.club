import { Currency } from "./../../models/currency";
import { Percentage } from "../../store/actions/cryptoCurrencyActions/cryptoCurrencyActionTypes";

import globalStyles from "../css/variables.module.scss";

export const validateInput = (value: string) => {
  if (+value < 0) {
    return (+value * -1).toString();
  } else {
    return value;
  }
};

export const convertFiatCurrency = (
  amount: string,
  inputFieldCurrency: Currency,
  outputFieldCurrency: Currency,
  operationType: "BUY" | "SALE"
) => {
  if (amount === "") {
    return "";
  }
  let totalValue =
    +validateInput(amount) *
    (operationType === "BUY" ? inputFieldCurrency.valueBuy : inputFieldCurrency.valueSale);
  let outputCurrencyValue: number;
  if (totalValue < 40000) {
    totalValue =
      +validateInput(amount) *
      (operationType === "BUY"
        ? inputFieldCurrency.valueBuyRoz!
        : inputFieldCurrency.valueSaleRoz!);
    outputCurrencyValue =
      operationType === "BUY"
        ? outputFieldCurrency.valueSaleRoz!
        : outputFieldCurrency.valueBuyRoz!;
  } else {
    outputCurrencyValue =
      operationType === "BUY" ? outputFieldCurrency.valueSale : outputFieldCurrency.valueBuy;
  }
  const convertedValue = (totalValue / outputCurrencyValue).toFixed(4).toString();
  return convertedValue;
};

export const convertCryptoCurrency = (
  amount: string,
  inputFieldCurrency: Currency,
  outputFieldCurrency: Currency,
  percentages: Percentage[],
  isBuyCrypto: boolean,
  operationType: "BUY" | "SALE"
) => {
  if (amount === "") {
    return "";
  }
  const totalValue =
    +validateInput(amount) *
    (operationType === "BUY" ? inputFieldCurrency.valueBuy : inputFieldCurrency.valueSale);
  const outputCurrencyValue =
    operationType === "BUY" ? outputFieldCurrency.valueSale : outputFieldCurrency.valueBuy;
  let percentage =
    percentages.find(
      (percentage) => totalValue >= percentage.amountFrom && totalValue <= percentage.amountTo
    ) || percentages[percentages.length - 1];

  let convertedValue = "";
  if (isBuyCrypto && operationType === "BUY") {
    convertedValue = (
      (totalValue * ((100 + percentage.percentBuyCrypto) / 100)) /
      outputCurrencyValue
    )
      .toFixed(2)
      .toString();
  }
  if (isBuyCrypto && operationType === "SALE") {
    convertedValue = (
      totalValue /
      (outputCurrencyValue * ((100 + percentage.percentBuyCrypto) / 100))
    )
      .toFixed(4)
      .toString();
  }
  if (!isBuyCrypto && operationType === "BUY") {
    convertedValue = (
      totalValue /
      (outputCurrencyValue * ((100 + percentage.percentSaleCrypto) / 100))
    )
      .toFixed(4)
      .toString();
  }
  if (!isBuyCrypto && operationType === "SALE") {
    convertedValue = (
      (totalValue * ((100 + percentage.percentSaleCrypto) / 100)) /
      outputCurrencyValue
    )
      .toFixed(2)
      .toString();
  }
  return convertedValue;
};

export const scrollToNode = (node: HTMLElement) => {
  const headerOffset = parseInt(globalStyles.headerHeight, 10);
  window.scrollTo({
    top: window.pageYOffset + node.getBoundingClientRect().top - headerOffset,
    behavior: "smooth"
  });
};
