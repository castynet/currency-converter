import React, { useContext, useState, useEffect } from "react";

const Context = React.createContext();

export function useApp() {
  return useContext(Context);
}

export const Provider = ({ children }) => {
  const [currencies, setCurrencies] = useState();
  const [allCurrencies, setAllCurrencies] = useState();
  const [conversions, setConversions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      var rawData = await fetch(
        "https://converter-backend.herokuapp.com/data",
        {
          method: "get",
        }
      );
      const data = await rawData.json();
      setCurrencies(data[0]);
      const allCurrencies = data.slice(0, 5);
      setAllCurrencies(allCurrencies);
      setLoading(false);
    })();
  }, []);

  async function sendToServer(data) {
    await fetch("https://converter-backend.herokuapp.com/conversions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  return (
    <Context.Provider
      value={{
        currencies,
        loading,
        conversions,
        setConversions,
        sendToServer,
        allCurrencies,
      }}
    >
      {children}
    </Context.Provider>
  );
};
