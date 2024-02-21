const mongoose = require("mongoose");

const AccountNumberSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      unique: true,
      required: [true, "Account Number is Missing"],
    },
  },
  { timestamps: true }
);

module.exports = AccountNumberSchema;
