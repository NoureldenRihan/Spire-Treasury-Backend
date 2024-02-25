const signUp = require("./Single Routes/Signup");
const transactions = require("./Single Routes/Transactions");
const balances = require("./Single Routes/Balances");

// Route Funtions Grouper
const Routes = {
  signUp,
  transactions,
  balances,
};

module.exports = Routes;
