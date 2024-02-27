const SignUpControllers = require("./Single Controllers/SignUp/SignUpControllers");
const TransactionControllers = require("./Single Controllers/Transactions/TransactionControllers");
const BalanceControllers = require("./Single Controllers/Balances/BalanceControllers");
const ConversionControllers = require("./Single Controllers/Conversions/ConversionControllers");

// Controllers Grouper
const Controllers = {
  SignUpControllers,
  TransactionControllers,
  BalanceControllers,
  ConversionControllers,
};

module.exports = Controllers;
