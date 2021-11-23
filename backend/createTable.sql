mysql --host=us-cdbr-east-04.cleardb.com --user=b5af8f2353bb9b --password=af93372e --reconnect heroku_50915e86f6f0e4b

CREATE TABLE IF NOT EXISTS `conversions` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  timestamp int NOT NULL,
  amount float NOT NULL,
  currencyTo varchar(255) NOT NULL,
  currencyFrom varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;