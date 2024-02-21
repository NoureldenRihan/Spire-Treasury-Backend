const mongoose = require("mongoose");
const Schemas = require("./Schemas");

// Database Models
const UserModel = mongoose.model("User", Schemas.UserSchema);

const TransactionModel = mongoose.model(
  "Transaction",
  Schemas.TransactionSchema
);

const AccountNumberModel = mongoose.model(
  "AccountNumber",
  Schemas.AccountNumberSchema
);

// Models Grouper
const Models = {
  UserModel,
  AccountNumberModel,
  TransactionModel,
};

module.exports = Models;
