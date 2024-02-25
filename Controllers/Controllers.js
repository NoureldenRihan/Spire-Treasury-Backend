const SignUpControllers = require("./Single Controllers/SignUp/SignUpControllers");
const TransactionsControllers = require("./Single Controllers/Transactions/TransactionsControllers");
const BalanceControllers = require("./Single Controllers/Balances/BalanceControllers");

// Controllers Grouper
const Controllers = {
  SignUpControllers,
  TransactionsControllers,
  BalanceControllers,
};

module.exports = Controllers;
