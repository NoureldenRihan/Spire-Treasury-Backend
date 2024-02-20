const mongoose = require("mongoose");
const Schemas = require("./Schemas");

// Database Models
const UserModel = mongoose.model("User", Schemas.UserSchema);

const TransactionModel = mongoose.model(
  "Transaction",
  Schemas.TransactionSchema
);

const EmailModel = mongoose.model("Email", Schemas.EmailSchema);

const AccountNumberModel = mongoose.model(
  "AccountNumber",
  Schemas.AccountNumberSchema
);

// Models Grouper
const Models = {
  UserModel,
  EmailModel,
  AccountNumberModel,
  TransactionModel,
};

module.exports = Models;
