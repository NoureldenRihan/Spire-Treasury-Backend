const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema(
  {
    balanceID: { type: String, required: [true, "Balance ID is Missing"] },
    type: {
      type: String,
      required: [true, "Please Select An Account Balance Type"],
    },
    amount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = BalanceSchema;
