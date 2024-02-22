const mongoose = require("mongoose");

const AccountNumberSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      unique: true,
      default: "AA000000",
      required: [true, "Account Number is Missing"],
    },
  },
  { timestamps: true }
);

module.exports = AccountNumberSchema;
