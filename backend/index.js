const express = require("express");
const cors = require("cors");
const unirest = require("unirest");
var convertor = require("xml-js");
const { json } = require("express");

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
app.get("/data", (request, response) => {
  unirest(
    "POST",
    "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml"
  ).end((res) => {
    if (res.error) {
      console.log(res.error);
    }
    var parsedRes = convertor.xml2json(res.body, {
      compact: true,
      spaces: 0,
    });
    parsedRes = JSON.parse(parsedRes);
    parsedRes = parsedRes["gesmes:Envelope"].Cube.Cube;
    // sort the array by date
    parsedRes.sort(function (a, b) {
      return new Date(b._attributes.time) - new Date(a._attributes.time);
    });

    // clean and remove all unnecessary data
    let currencies = [];
    for (const currency of parsedRes[0].Cube) {
      currencies.push(currency._attributes);
    }

    // package the data in an object for the frontend
    const refinedData = {
      ...parsedRes[0]._attributes,
      ...{ currencies: currencies },
    };

    // send the data to the frontend
    response.json(refinedData);
  });
});

// create a route for mpesa to send data on the result of the transaction
app.post("/conversions", (request, response) => {});

// sets the port & listens in for requests
app.listen(2000, () => {
  console.log("the server is running");
});
