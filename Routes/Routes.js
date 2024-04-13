const users = require("./Single Routes/Users");
const transactions = require("./Single Routes/Transactions");
const balances = require("./Single Routes/Balances");
const conversions = require("./Single Routes/Conversions");

// Route Funtions Grouper
const Routes = {
  users,
  transactions,
  balances,
  conversions,
};

module.exports = Routes;
