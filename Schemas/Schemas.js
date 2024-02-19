const TransactionSchema = require("./Single Schemas/TransactionSchema");
const BalanceSchema = require("./Single Schemas/BalanceSchema");
const UserSchema = require("./Single Schemas/UserSchema");

// Schemas Grouper
const Schemas = {
  UserSchema,
  TransactionSchema,
  BalanceSchema,
};

module.exports = Schemas;
