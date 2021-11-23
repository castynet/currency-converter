const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b5af8f2353bb9b",
  password: "af93372e",
  database: "heroku_50915e86f6f0e4b",
});

// open the MySQL connection

connection.getConnection(function (err, connection) {
  if (err) {
    console.log(err);
  } else console.log("Successfully connected to the database.");
});

module.exports = connection;
