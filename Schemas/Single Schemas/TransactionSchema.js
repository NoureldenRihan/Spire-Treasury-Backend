const mongoose = require("mongoose");

// ^^ Transaction Schema Code Guide
// Example: AABB0101240000 -- (AA/BB/01/01/24/00/00)
// AA: first two letters of fromAccNum
// BB: first two letters of toAccNum
// 01: Day of Transaction
// 01: Month of Transaction
// 24: last two digits of Year of Transaction
// 00: Hour Time of Transaction
// 00: Minute Time of Transaction

const TransactionSchema = new mongoose.Schema(
  {
    code: { type: String, default: "AABB0101240000" }, // ^^
    date: { type: String, default: "0000-00-00" },
    time: { type: String, default: "00:00:00" },
    type: {
      type: String,
      default: "N/A",
      required: [true, "Please Specify Type of Transaction"],
    },
    statusCode: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    amount: {
      type: Number,
      default: 0,
      required: [true, "Please Provide the Amount to be Transacted"],
    },
    fees: { type: Number, default: 0 },
    fromAccNum: { type: String, default: "N/A" },
    toAccNum: {
      type: String,
      default: "N/A",
      required: [true, "Please Provide the Account Number to Transact to"],
    },
    fromBalanceID: { type: String, default: "N/A" },
    toBalanceID: { type: String, default: "N/A" },
  },
  { timestamps: true }
);

module.exports = TransactionSchema;
