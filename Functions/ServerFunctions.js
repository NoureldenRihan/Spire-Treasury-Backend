const generateAccountNumber = require("./Single Functions/GenerateAccountNumber");
const DateTimeFunctions = require("./Single Functions/DateTimeFunctions");

// Functions Grouper
const serverFunctions = {
  generateAccountNumber,
  DateTimeFunctions,
};

module.exports = serverFunctions;
