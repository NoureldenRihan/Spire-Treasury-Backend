const signUp = require("./Single Routes/Signup");
const transactions = require("./Single Routes/Transactions");
const balances = require("./Single Routes/Balances");
const conversions = require("./Single Routes/Conversions");

// Route Funtions Grouper
const Routes = {
  signUp,
  transactions,
  balances,
  conversions,
};

module.exports = Routes;
