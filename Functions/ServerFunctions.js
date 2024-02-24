const generateAccountNumber = require("./Single Functions/GenerateAccountNumber");
const DateTimeFunctions = require("./Single Functions/DateTimeFunctions");
const AccountNumberDuplicateChecker = require("./Single Functions/AccountNumberDuplicateChecker");
const TransactionValidation = require("./Single Functions/TransactionValidation");

// Functions Grouper
const serverFunctions = {
  generateAccountNumber,
  DateTimeFunctions,
  AccountNumberDuplicateChecker,
  TransactionValidation,
};

module.exports = serverFunctions;
