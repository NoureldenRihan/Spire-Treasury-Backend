const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  date: { type: String, default: "0000-00-00" },
  time: { type: String, default: "00:00:00" },
  type: { type: String, default: "N/A" },
  statusCode: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  fromUserID: { type: String, default: "N/A" },
  toUserID: { type: String, default: "N/A" },
  fromBalanceID: { type: String, default: "N/A" },
  toBalanceID: { type: String, default: "N/A" },
});

const BalanceSchema = new mongoose.Schema({
  balanceID: { type: String, default: "N/A" },
  type: { type: String, default: "N/A" },
  amount: { type: Number, default: 0 },
  ownerUserID: { type: String, default: "N/A" },
});

const UserSchema = new mongoose.Schema({
  firstName: { type: String, default: "N/A" },
  lastName: { type: String, default: "N/A" },
  fullName: { type: String, default: "N/A" },
  accountNumber: { type: String, default: "0000000000" },
  wiringCode: { type: String, default: "N/A" },
  password: { type: String, default: "N/A" },
  email: { type: String, default: "N/A" },
  referredByCode: { type: String, default: "N/A" },
  referralCode: { type: String, default: "N/A" },
  transactions: [TransactionSchema],
  balance: [BalanceSchema],
});

const Schemas = {
  UserSchema: UserSchema,
  TransactionSchema: TransactionSchema,
  BalanceSchema: BalanceSchema,
};

module.exports = Schemas;
