require("dotenv").config();
const Models = require("../../Schemas/Models");
const TransactionFeePercentage = require("../../Constants/TransactionFeePercentage");

const STAccNum = process.env.STAccNum;
const STBalanceID = process.env.STBalanceID;

// Pre Validation Objectives
// 1) Checks that Users with the chosen account Numbers Exists
// 2) Checks that Account Numbers and Balance IDs are for same account
// 3) Checks that Both Accounts Use are on same tier
// 4) Checks that Fee Percentage is Applied Correctly
// 5) If Transaction Type is 'NU', Checks That Paying side is Spire Treasury Team

async function TransactionPreValidation(transactionData) {
  let AccountsTier;
  try {
    // 1) Checks that Users with the chosen account Numbers Exists

    const payingUser = await Models.UserModel.findOne({
      accountNumber: transactionData.fromAccNum,
    });
    const ReceivingUser = await Models.UserModel.findOne({
      accountNumber: transactionData.toAccNum,
    });
    if (!payingUser) {
      console.log(`Account Number ${transactionData.fromAccNum} Doesn't exist`);
      console.log(`Pre Transaction Validation Failed`);
      return false;
    } else if (!ReceivingUser) {
      console.log(`Account Number ${transactionData.toAccNum} Doesn't exist`);
      console.log(`Pre Transaction Validation Failed`);
      return false;
    }

    // 2) Checks that Account Numbers and Balance IDs are for same account

    if (transactionData.fromAccNum !== transactionData.fromBalanceID.slice(2)) {
      console.log(
        `Balance ID ${transactionData.fromBalanceID} is not linked with Account Number ${transactionData.fromAccNum}`
      );
      console.log(`Pre Transaction Validation Failed`);
      return false;
    } else if (
      transactionData.toAccNum !== transactionData.toBalanceID.slice(2)
    ) {
      console.log(
        `Balance ID ${transactionData.fromBalanceID} is not linked with Account Number ${transactionData.fromAccNum}`
      );
      console.log(`Pre Transaction Validation Failed`);
      return false;
    }
  } catch (error) {
    console.error("Error While Pre Validating Transaction:", error);
  }

  // 3) Checks that Both Accounts Use are on same tier
  if (
    transactionData.fromBalanceID.slice(0, 2) !==
    transactionData.toBalanceID.slice(0, 2)
  ) {
    console.log(`Accounts are on Different Tiers`);
    console.log(`Pre Transaction Validation Failed`);
    return false;
  }

  AccountsTier = transactionData.fromBalanceID.slice(0, 2);

  // 4) Checks that Fee Percentage is Applied Correctly
  if (
    transactionData.total * (1 - TransactionFeePercentage[AccountsTier]) !==
    transactionData.amount
  ) {
    console.log(`Incorrect Account Tier Fee`);
    console.log(`Pre Transaction Validation Failed`);
    return false;
  }

  //   5) If Transaction Type is 'NU', Checks That Paying side is Spire Treasury Team
  if (transactionData.type === "NU") {
    if (transactionData.fromAccNum === STAccNum) {
      if (transactionData.fromBalanceID === STBalanceID) {
        console.log(`New User Transaction`);
      } else {
        console.log(
          `New User Transaction is not supplied by Spire Treasury Team`
        );
        console.log(`Pre Transaction Validation Failed`);
        return false;
      }
    } else {
      console.log(
        `New User Transaction is not supplied by Spire Treasury Team`
      );
      console.log(`Pre Transaction Validation Failed`);
      return false;
    }
  }

  console.log("Successful Transaction Pre Validation");
  return true;
}

module.exports = TransactionPreValidation;
