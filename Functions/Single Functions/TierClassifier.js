const Tiers = require("../../Constants/Tiers");

function TierClassifier(BalanceID) {
  return Tiers[BalanceID];
}

module.exports = TierClassifier;
