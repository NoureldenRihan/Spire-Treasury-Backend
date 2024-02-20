const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  email: { type: String, unique: true, default: "N/A" },
});

module.exports = EmailSchema;
