const TransactionSchema = require("./Single Schemas/TransactionSchema");
const BalanceSchema = require("./Single Schemas/BalanceSchema");
const UserSchema = require("./Single Schemas/UserSchema");
const AccountNumberSchema = require("./Single Schemas/AccountNumberSchema");

// Schemas Grouper
const Schemas = {
  UserSchema,
  AccountNumberSchema,
  TransactionSchema,
  BalanceSchema,
};

module.exports = Schemas;
