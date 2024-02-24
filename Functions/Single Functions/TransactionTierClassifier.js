const TransactionTiers = require("../../Constants/TransactionTiers");

function TransactionTierClassifier(BalanceID) {
  return TransactionTiers[BalanceID];
}

module.exports = TransactionTierClassifier;
