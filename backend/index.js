const express = require("express");
const cors = require("cors");
const unirest = require("unirest");
var convertor = require("xml-js");
const { json } = require("express");
const db = require("./db");
const { fetchCurrencies } = require("./fetchCurrencies");
const PORT = process.env.PORT || 2000;

// define our app
const app = express();

// define and use cors
app.use(
  cors({
    origin: "*",
  })
);

// parse requests of content-type: application/json
app.use(express.json());

// create a route on '/' | homepage | index
app.get("/", (request, response) => {});

// create a route on '/data' to feed the frontend with processed currency data
app.get("/data", async (request, response) => {
  const currencies = await fetchCurrencies();

  // send the data to the frontend
  response.json(currencies);
});

// create a route for mpesa to send data on the result of the transaction
app.post("/conversions", (request, response) => {
  const { amount, from, to, now } = request.body;
  var sql = `INSERT INTO conversions (timestamp, amount, currencyTo, currencyFrom) VALUES (${now}, ${amount}, '${to}', '${from}')`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else {
      response.json({ success: true });
    }
  });
});

// sets the port & listens in for requests
app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});

// keep the connection alive
setInterval(function () {
  db.query("SELECT 1");
}, 5000);
