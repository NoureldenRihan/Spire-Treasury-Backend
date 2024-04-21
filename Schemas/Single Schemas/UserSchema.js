const mongoose = require("mongoose");
const TransactionSchema = require("./TransactionSchema");
const BalanceSchema = require("./BalanceSchema");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "N/A",
      required: [true, "Please Provide your First Name"],
    },
    lastName: {
      type: String,
      default: "N/A",
      required: [true, "Please Provide your Last Name"],
    },
    fullName: {
      type: String,
      default: "N/A",
      required: [true, "Please Provide your Full Name"],
    },
    accountNumber: {
      type: String,
      unique: true,
      default: "AA000000",
      required: [true, "Account Number is Missing"],
    },
    type: {
      type: String,
      default: "Normal",
    },
    password: {
      type: String,
      default: "N/A",
      required: [true, "Please Enter a Password"],
    },
    email: {
      type: String,
      unique: true,
      default: "N/A",
      required: [true, "Please Enter an Email"],
    },
    transactions: [TransactionSchema],
    balances: [BalanceSchema],
  },
  { timestamps: true }
);

module.exports = UserSchema;
