const TransactionSchema = require("./Single Schemas/TransactionSchema");
const BalanceSchema = require("./Single Schemas/BalanceSchema");
const UserSchema = require("./Single Schemas/UserSchema");
const EmailSchema = require("./Single Schemas/EmailSchema");
const AccountNumberSchema = require("./Single Schemas/AccountNumberSchema");

// Schemas Grouper
const Schemas = {
  UserSchema,
  EmailSchema,
  AccountNumberSchema,
  TransactionSchema,
  BalanceSchema,
};

module.exports = Schemas;
