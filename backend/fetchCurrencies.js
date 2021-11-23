const unirest = require("unirest");
var convertor = require("xml-js");

module.exports.fetchCurrencies = function () {
  return new Promise((resolve, reject) => {
    try {
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
        let cleanData = [];

        for (const time of parsedRes) {
          let currencies = [];
          for (const currency of time.Cube) {
            currencies.push(currency._attributes);
          }
          const refinedData = {
            ...time._attributes,
            ...{ currencies: currencies },
          };
          cleanData.push(refinedData);
        }
        return resolve(cleanData);
      });
    } catch (error) {
      return reject(error);
    }
  });
};
