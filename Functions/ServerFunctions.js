const generateAccountNumber = require("./Single Functions/GenerateAccountNumber");
const DateTimeFunctions = require("./Single Functions/DateTimeFunctions");
const AccountNumberDuplicateChecker = require("./Single Functions/AccountNumberDuplicateChecker");
const TransactionPreValidation = require("./Single Functions/TransactionPreValidation");
const TransactionPostValidation = require("./Single Functions/TransactionPostValidation");

// Functions Grouper
const serverFunctions = {
  generateAccountNumber,
  DateTimeFunctions,
  AccountNumberDuplicateChecker,
  TransactionPreValidation,
  TransactionPostValidation,
};

module.exports = serverFunctions;
