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

module.exports = TransactionSchema;
