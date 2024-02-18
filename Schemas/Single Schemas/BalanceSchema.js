const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema({
  balanceID: { type: String, default: "N/A" },
  type: { type: String, default: "N/A" },
  amount: { type: Number, default: 0 },
  ownerUserID: { type: String, default: "N/A" },
});

module.exports = BalanceSchema;
