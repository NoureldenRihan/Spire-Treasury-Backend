const Tiers = require("../../Constants/Tiers");
const Models = require("../../Schemas/Models");

// Validation Objectives
// 1) Checks that A Correct Balance Tier is Chosen
// 2) Checks that User with the chosen account Numbers Exists
// 3) Checks that User doesn't already have a Balance with the chosen tier
// 4) Checks that the Balance Amount is Greater than or Equal to 0

async function BalanceValidation(balanceData) {
  try {
    const balanceTierCode = balanceData.balanceID.slice(0, 2);
    const balanceTier = Tiers[balanceTierCode];

    // 1) Checks that A Correct Balance Tier is Chosen

    if (balanceTier === undefined) {
      console.log(`Invalid Balance Tier Chosen`);
      console.log(`Balance Validation Failed`);
      return false;
    }

    const accountNumber = balanceData.balanceID.slice(2);

    const user = await Models.UserModel.findOne({
      accountNumber: accountNumber,
    });

    // 2) Checks that User with the chosen account Numbers Exists

    if (!user) {
      console.log(`User with Account Number ${accountNumber} Doesn't exist`);
      console.log(`Balance Validation Failed`);
      return false;
    }

    // 3) Checks that User doesn't already have a Balance with the chosen tier

    let alreadyHasBalance = false;

    user.balance.forEach((balance) => {
      if (balance.balanceID === balanceData.balanceID) {
        alreadyHasBalance = true;
      }
    });

    if (alreadyHasBalance) {
      console.log(`User Already Has A Balance on the ${balanceTier} Tier`);
      console.log(`Balance Validation Failed`);
      return false;
    }

    // 4) Checks that the Balance Amount is not Less than 0

    if (balanceData.amount < 0) {
      console.log(`Balance Amount is in Negative`);
      console.log(`Balance Validation Failed`);
      return false;
    }

    console.log("Successful Balance Validation");
    return true;
  } catch (error) {
    console.error("Error While Validating Balance:", error);
  }
}

module.exports = BalanceValidation;
