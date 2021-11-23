import { useApp } from "./context";

export default function Currencies() {
  const app = useApp();
  const date = app.currencies ? new Date(app.currencies.time) : "";
  const allCurrencies = app.allCurrencies ? app.allCurrencies : "";

  function highest(current, i) {
    var a = parseFloat(current);
    var b = parseFloat(allCurrencies[0].currencies[i].rate);
    var c = parseFloat(allCurrencies[1].currencies[i].rate);
    var d = parseFloat(allCurrencies[2].currencies[i].rate);
    var e = parseFloat(allCurrencies[3].currencies[i].rate);
    var f = parseFloat(allCurrencies[4].currencies[i].rate);
    const max = Math.max(a, b, c, d, e, f);
    const min = Math.min(a, b, c, d, e, f);
    const result = a === max ? "highest" : a === min ? "lowest" : "";

    console.log(max, min, result, a);
    return result;
  }

  return (
    <>
      {app.currencies && allCurrencies ? (
        <>
          <div className="mt-4 pt-5 pb-5 p-3 pb-2 text-center">
            <h2>Euro FX Reference Rates</h2>
            <hr />
            <p>All currencies quoted against the euro (base currency)</p>
            <p>*Current Rates as at {`${date}`}</p>
          </div>
          <div className="pt-5 pb-5 p-3 pt-0" style={{ overflow: "scroll" }}>
            <table style={{ margin: "0 auto" }}>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Current Rates</th>
                  <th>{allCurrencies[1].time}</th>
                  <th>{allCurrencies[2].time}</th>
                  <th>{allCurrencies[3].time}</th>
                  <th>{allCurrencies[4].time}</th>
                </tr>
              </thead>
              <tbody>
                {app.currencies.currencies.map((c, i) => (
                  <tr key={c.currency}>
                    <td>{c.currency}</td>
                    <td className={`${highest(c.rate, i)} current`}>
                      {c.rate}
                    </td>
                    <td
                      className={highest(
                        allCurrencies[1].currencies[i].rate,
                        i
                      )}
                    >
                      {allCurrencies[1].currencies[i].rate}
                    </td>
                    <td
                      className={highest(
                        allCurrencies[2].currencies[i].rate,
                        i
                      )}
                    >
                      {allCurrencies[2].currencies[i].rate}
                    </td>
                    <td
                      className={highest(
                        allCurrencies[3].currencies[i].rate,
                        i
                      )}
                    >
                      {allCurrencies[3].currencies[i].rate}
                    </td>
                    <td
                      className={highest(
                        allCurrencies[4].currencies[i].rate,
                        i
                      )}
                    >
                      {allCurrencies[4].currencies[i].rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <p>Loading</p>
        </>
      )}
    </>
  );
}
