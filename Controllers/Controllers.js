const TransactionControllers = require("./Single Controllers/Transactions/TransactionControllers");
const BalanceControllers = require("./Single Controllers/Balances/BalanceControllers");
const ConversionControllers = require("./Single Controllers/Conversions/ConversionControllers");
const UsersControllers = require("./Single Controllers/Users/UsersControllers");

// Controllers Grouper
const Controllers = {
  TransactionControllers,
  BalanceControllers,
  ConversionControllers,
  UsersControllers,
};

module.exports = Controllers;
