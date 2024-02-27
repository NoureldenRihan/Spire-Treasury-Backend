const Tiers = require("../../Constants/Tiers");
const Models = require("../../Schemas/Models");

// Validation Objectives
// 1) Checks that Correct Balance Tiers are Chosen
// 2) Checks that User with the chosen account Number Exists
// 3) Checks that User with the chosen account Number Has a Balance with the chosen Tiers
// 4) Checks that User has enough Balance for the Conversion
// 5) Checks that the account Number and the Balance IDs are for the same User
// 6) Checks that the Conversion Tiers are not the same Tier
// 7) Checks that the Conversion Amount is Greater than 0

async function CurrencyConverionValidation(currencyConversionData) {
  try {
    const fromBalanceTierCode = currencyConversionData.fromBalanceID.slice(
      0,
      2
    );
    const fromBalanceTier = Tiers[fromBalanceTierCode];

    const toBalanceTierCode = currencyConversionData.toBalanceID.slice(0, 2);
    const toBalanceTier = Tiers[toBalanceTierCode];

    // 1) Checks that Correct Balance Tiers are Chosen

    if (fromBalanceTier === undefined || toBalanceTier === undefined) {
      console.log(`Invalid Balance Tier Chosen`);
      console.log(`Currency Conversion Validation Failed`);
      return false;
    }

    const accountNumber = currencyConversionData.AccNum;

    const user = await Models.UserModel.findOne({
      accountNumber: accountNumber,
    });

    // 2) Checks that User with the chosen account Numbers Exists

    if (!user) {
      console.log(`User with Account Number ${accountNumber} Doesn't exist`);
      console.log(`Currency Conversion Validation Failed`);
      return false;
    }

    // 3) Checks that User with the chosen account Number Has a Balance with the chosen Tiers

    let fromBalanceAvailable = false;
    let toBalanceAvailable = false;

    user.balance.forEach((balance) => {
      if (balance.balanceID === currencyConversionData.fromBalanceID) {
        fromBalanceAvailable = true;
      } else if (balance.balanceID === currencyConversionData.toBalanceID) {
        toBalanceAvailable = true;
      }
    });

    if (!fromBalanceAvailable) {
      if (!toBalanceAvailable) {
        console.log(
          `User Has no Balances on the ${currencyConversionData.fromTier} & the ${currencyConversionData.toTier} Tier`
        ); // Or Invalid Balances -- Needs Fixing
        console.log(`Currency Conversion Validation Failed`);
        return false;
      } else {
        console.log(
          `User Has no Balances on the ${currencyConversionData.fromTier} Tier`
        );
        console.log(`Currency Conversion Validation Failed`);
        return false;
      }
    } else if (!toBalanceAvailable) {
      console.log(
        `User Has no Balances on the ${currencyConversionData.toTier} Tier`
      );
      console.log(`Currency Conversion Validation Failed`);
      return false;
    }

    // 4) Checks that User has enough Balance for the Conversion

    let AvailableBalance = false;

    user.balance.forEach((balance) => {
      if (balance.type === currencyConversionData.fromTier) {
        if (balance.amount >= currencyConversionData.amount) {
          AvailableBalance = true;
        }
      }
    });

    if (!AvailableBalance) {
      console.log(`User Doesn't Have Enough Balance to Convert From`);
      console.log(`Currency Conversion Validation Failed`);
      return false;
    }

    // 5) Checks that the account Number and the Balance IDs are for the same User

    if (
      currencyConversionData.AccNum !==
        currencyConversionData.fromBalanceID.slice(2) &&
      currencyConversionData.AccNum !==
        currencyConversionData.toBalanceID.slice(2)
    ) {
      console.log(`Balances Do not Belong to the User`);
      console.log(`Currency Conversion Validation Failed`);
      return false;
    }

    // 6) Checks that the Conversion Tiers are not the same Tier

    if (
      currencyConversionData.fromTier === currencyConversionData.toTier &&
      fromBalanceTierCode === toBalanceTierCode
    ) {
      console.log(`Currency Conversion is Not Allowed on Same Tier`);
      console.log(`Currency Conversion Validation Failed`);
      return false;
    }

    // 7) Checks that the Conversion Amount is Greater than 0

    if (currencyConversionData.amount <= 0) {
      console.log(`Currency Conversion Amount Should be greater than 0`);
      console.log(`Currency Conversion Validation Failed`);
      return false;
    }

    console.log("Successful Currency Conversion Validation");
    return true;
  } catch (error) {
    console.error("Error While Validating Currency Conversion:", error);
  }
}

module.exports = CurrencyConverionValidation;
