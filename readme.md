# The Advanced Currency Converter

## Structure

/Backend -> containing the backend done in Node Express & MySQL
/Frontend -> containing the frontend done in React and styled with bootstrap

## Backend Api endpoints

[https://converter-backend.herokuapp.com/data](https://converter-backend.herokuapp.com/data) - gives an array
of the last 5 rate entries sorted from the most recent to the least recent
[https://converter-backend.herokuapp.com/conversions](https://converter-backend.herokuapp.com/conversions) - allows
react to post the conversions to the backend where they are saved in the MySql db

## Frontend rates table

The highest rate for a particular currency is marked in green, the lowest is marked in red. The table contains the last 5
rates for each currency shown from the most recent to the least recent

## Hosting

Both the frontend and the backend are hosted with Heroku and the api accessible through the endpoints mentioned above and the frontend accessible here [https://europaadvancedconverter.herokuapp.com/](https://europaadvancedconverter.herokuapp.com/)
