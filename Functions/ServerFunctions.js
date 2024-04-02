const generateAccountNumber = require("./Single Functions/GenerateAccountNumber");
const DateTimeFunctions = require("./Single Functions/DateTimeFunctions");
const AccountNumberDuplicateChecker = require("./Single Functions/AccountNumberDuplicateChecker");
const TransactionValidation = require("./Single Functions/TransactionValidation");
const UserTypeClassifier = require("./Single Functions/UserTypeClassifier");
const TierClassifier = require("./Single Functions/TierClassifier");
const BalanceValidation = require("./Single Functions/BalanceValidation");
const CurrencyConverionValidation = require("./Single Functions/CurrencyConverionValidation");
const ErrorClassifier = require("./Single Functions/ErrorClassifier");

// Functions Grouper
const serverFunctions = {
  generateAccountNumber,
  DateTimeFunctions,
  AccountNumberDuplicateChecker,
  TransactionValidation,
  UserTypeClassifier,
  TierClassifier,
  BalanceValidation,
  CurrencyConverionValidation,
  ErrorClassifier,
};

module.exports = serverFunctions;
