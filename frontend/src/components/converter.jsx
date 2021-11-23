import { useState, useEffect } from "react";
import { useApp } from "./context";

export default function Converter() {
  const app = useApp();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(0);
  const [lastTyped, setLastTyped] = useState(null);
  const [lastSent, setLastSent] = useState(null);

  useEffect(() => {
    function sendToServer() {
      const now = Date.now();
      setLastSent(Date.now());
      if (now - lastSent > 3000) {
        const data = { amount, from, to, now };
        app.sendToServer(data);
      }
    }
    if (app.currencies) {
      var fromRate = app.currencies.currencies.find((c) => c.currency === from);
      var toRate = app.currencies.currencies.find((c) => c.currency === to);
      fromRate = parseFloat(fromRate.rate);
      toRate = parseFloat(toRate.rate);
      var res = (amount * toRate) / fromRate;
      res = (res + Number.EPSILON).toFixed(2);
      setResult(res);
      if (amount && lastTyped) {
        setLastTyped(null);
        sendToServer();
      }
    }
  }, [amount, from, to, app, lastTyped, lastSent]);

  return (
    <>
      {app.currencies ? (
        <>
          <div className="mt-5 pt-5 pb-5 p-sm-1 text-center">
            <h1>Europa | Advanced Currency Calculator</h1>
            <p>the latest rates on all your favorite currencies</p>
          </div>
          <div
            className="p-4 shadow"
            style={{
              width: "fit-content",
              maxWidth: "100%",
              backgroundColor: "white",
              margin: "0 auto",
            }}
          >
            <label className="p-1 m-2 mt-0 mb-0" htmlFor="fromCurrency">
              Currencies
            </label>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "410px", maxWidth: "100%" }}
            >
              <select
                className="p-1 m-2 currency-input"
                type="text"
                name="fromCurrency"
                id="fromAmount"
                style={{ width: "175px", maxWidth: "100%" }}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                <optgroup label="From">
                  {app.currencies.currencies.map((c) => (
                    <option key={c.currency}>{c.currency}</option>
                  ))}
                </optgroup>
              </select>
              to
              <select
                className="p-1 m-2 currency-input"
                type="text"
                name="toCurrency"
                id="toCurrency"
                style={{ width: "175px", maxWidth: "100%" }}
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                <optgroup label="To">
                  {app.currencies.currencies.map((c) => (
                    <option key={c.currency}>{c.currency}</option>
                  ))}
                </optgroup>
              </select>
            </div>
            <label className="p-1 m-2 mt-0 mb-0" htmlFor="fromAmount">
              Amount
            </label>
            <br />
            <input
              className="p-1 m-2 currency-input"
              type="number"
              name="fromAmount"
              id="fromAmount"
              style={{ width: "392px", maxWidth: "100%" }}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setTimeout(() => setLastTyped(1), 3000);
              }}
            />
            {amount ? (
              <p
                className="pt-3 text-center"
                style={{
                  width: "400px",
                  maxWidth: "100%",
                  marginBottom: "-10px",
                }}
              >
                {amount} {from} equals <br />
                <span style={{ fontSize: "2em", fontWeight: "500" }}>
                  {result} {to}
                </span>
                <br />
                as of {app.currencies.time}
              </p>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <p className="text-center p-5">Loading</p>
      )}
    </>
  );
}
