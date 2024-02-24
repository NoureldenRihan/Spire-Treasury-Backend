const generateAccountNumber = require("./Single Functions/GenerateAccountNumber");
const DateTimeFunctions = require("./Single Functions/DateTimeFunctions");
const AccountNumberDuplicateChecker = require("./Single Functions/AccountNumberDuplicateChecker");
const TransactionValidation = require("./Single Functions/TransactionValidation");
const UserTypeAssigner = require("./Single Functions/UserTypeAssigner");
const TransactionTierClassifier = require("./Single Functions/TransactionTierClassifier");

// Functions Grouper
const serverFunctions = {
  generateAccountNumber,
  DateTimeFunctions,
  AccountNumberDuplicateChecker,
  TransactionValidation,
  UserTypeAssigner,
  TransactionTierClassifier,
};

module.exports = serverFunctions;
