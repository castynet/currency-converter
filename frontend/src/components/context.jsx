import React, { useContext, useState, useEffect } from "react";

const Context = React.createContext();

export function useApi() {
  return useContext(Context);
}

export const Provider = ({ children }) => {
  const [currencies, setCurrencies] = useState([]);
  const [conversions, setConversions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      var rawData = await fetch("http://localhost:2000/data", {
        method: "get",
      });
      const data = await rawData.json();
      setCurrencies(data);
      setLoading(false);
    })();
  }, []);

  return (
    <Context.Provider
      value={{
        currencies,
        loading,
        conversions,
        setConversions,
      }}
    >
      {children}
    </Context.Provider>
  );
};
