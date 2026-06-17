import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext(null);

const RATES = {
  USD: 1,
  PKR: 280,
  EUR: 0.92,
};

const SYMBOLS = {
  USD: "$",
  PKR: "PKR ",
  EUR: "€",
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("PKR");

  const formatPrice = (price) => {
    if (!price) return "";
    const converted = price * RATES[currency];
    if (currency === "PKR") {
      return `PKR ${Math.round(converted).toLocaleString()}`;
    }
    return `${SYMBOLS[currency]}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatPrice, rates: RATES }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
