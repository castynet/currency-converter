const { fetchCurrencies } = require("./fetchCurrencies");
const assert = require("assert").strict;

it("should fetch currencies and return an array of 5", async function () {
  const currencies = await fetchCurrencies();
  const length = currencies.length;
  console.log(length);
  expect(currencies).to.be.an("array");
  expect(currencies).to.have.length(5);
});
