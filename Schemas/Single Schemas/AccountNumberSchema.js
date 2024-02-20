const mongoose = require("mongoose");

const AccountNumberSchema = new mongoose.Schema({
  accountNumber: { type: String, unique: true, default: "AA000000" },
});

module.exports = AccountNumberSchema;
