const generateAccountNumber = require("./Single Functions/GenerateAccountNumber");
const DateTimeFunctions = require("./Single Functions/DateTimeFunctions");
const AccountNumberDuplicateChecker = require("./Single Functions/AccountNumberDuplicateChecker");
const TransactionValidation = require("./Single Functions/TransactionValidation");
const UserTypeAssigner = require("./Single Functions/UserTypeAssigner");
const TierClassifier = require("./Single Functions/TierClassifier");
const BalanceValidation = require("./Single Functions/BalanceValidation");

// Functions Grouper
const serverFunctions = {
  generateAccountNumber,
  DateTimeFunctions,
  AccountNumberDuplicateChecker,
  TransactionValidation,
  UserTypeAssigner,
  TierClassifier,
  BalanceValidation,
};

module.exports = serverFunctions;
