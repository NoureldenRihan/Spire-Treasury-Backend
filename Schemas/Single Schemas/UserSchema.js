const mongoose = require("mongoose");
const TransactionSchema = require("./TransactionSchema");
const BalanceSchema = require("./BalanceSchema");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, default: "N/A" },
  lastName: { type: String, default: "N/A" },
  fullName: { type: String, default: "N/A" },
  accountNumber: { type: String, default: "AA000000" },
  password: { type: String, default: "N/A" },
  email: { type: String, default: "N/A" },
  transactions: [TransactionSchema],
  balance: [BalanceSchema],
});

module.exports = UserSchema;
