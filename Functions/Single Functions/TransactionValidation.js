require("dotenv").config();
const Models = require("../../Schemas/Models");
const TransactionFeePercentage = require("../../Constants/TransactionFeePercentage");

const STAccNum = process.env.STAccNum;
const STBalanceID = process.env.STBalanceID;

// Validation Objectives
// 1) Checks that the Transaction Amount is Greater than 0
// 2) Checks that Users with the chosen account Numbers Exists
// 3) Checks that Account Numbers and Balance IDs are for same account
// 4) Checks that Both Accounts Use are on same tier
// 5) Checks that the Paying User Has enough Funds
// 6) Checks that Fee Percentage is Applied Correctly in case of a Wire Transaction
// 7) If Transaction Type is 'NU', Checks That Paying side is Spire Treasury Team

async function TransactionValidation(transactionData) {
  try {
    let AccountsTier;

    const payingUser = await Models.UserModel.findOne({
      accountNumber: transactionData.fromAccNum,
    });

    const ReceivingUser = await Models.UserModel.findOne({
      accountNumber: transactionData.toAccNum,
    });

    // 1) Checks that the Transaction Amount is Greater than 0

    if (transactionData.amount <= 0) {
      console.log(`Transaction Amount is 0 or less`);
      console.log(`Transaction Validation Failed`);
      return false;
    }

    // 2) Checks that Users with the chosen account Numbers Exists

    if (!payingUser) {
      console.log(`Account Number ${transactionData.fromAccNum} Doesn't exist`);
      console.log(`Transaction Validation Failed`);
      return false;
    } else if (!ReceivingUser) {
      console.log(`Account Number ${transactionData.toAccNum} Doesn't exist`);
      console.log(`Transaction Validation Failed`);
      return false;
    }

    // 3) Checks that Account Numbers and Balance IDs are for same account

    if (transactionData.fromAccNum !== transactionData.fromBalanceID.slice(2)) {
      console.log(
        `Balance ID ${transactionData.fromBalanceID} is not linked with Account Number ${transactionData.fromAccNum}`
      );
      console.log(`Transaction Validation Failed`);
      return false;
    } else if (
      transactionData.toAccNum !== transactionData.toBalanceID.slice(2)
    ) {
      console.log(
        `Balance ID ${transactionData.fromBalanceID} is not linked with Account Number ${transactionData.fromAccNum}`
      );
      console.log(`Transaction Validation Failed`);
      return false;
    }

    // 4) Checks that Both Accounts Use are on same tier

    if (
      transactionData.fromBalanceID.slice(0, 2) !==
      transactionData.toBalanceID.slice(0, 2)
    ) {
      console.log(`Accounts are on Different Tiers`);
      console.log(`Transaction Validation Failed`);
      return false;
    }

    AccountsTier = transactionData.fromBalanceID.slice(0, 2);

    // 5) Checks that the Paying User Has enough Funds

    let hasEnoughFunds = false;

    payingUser.balance.forEach((balance) => {
      if (balance.balanceID === transactionData.fromBalanceID) {
        if (balance.amount >= transactionData.total) {
          hasEnoughFunds = true;
        }
      }
    });

    if (!hasEnoughFunds) {
      console.log(`Paying User Doesn't have enough funds`);
      console.log(`Transaction Validation Failed`);
      return false;
    }

    // 6) Checks that Fee Percentage is Applied Correctly in case of a Wire Transaction

    if (
      transactionData.total * (1 - TransactionFeePercentage[AccountsTier]) !==
        transactionData.amount &&
      transactionData.type !== "NU"
    ) {
      console.log(`Incorrect Account Tier Fee`);
      console.log(`Transaction Validation Failed`);
      return false;
    }

    // 7) If Transaction Type is 'NU', Checks That Paying side is Spire Treasury Team

    if (transactionData.type === "NU") {
      if (transactionData.fromAccNum === STAccNum) {
        if (transactionData.fromBalanceID === STBalanceID) {
          console.log(`New User Transaction`);
        } else {
          console.log(
            `New User Transaction is not supplied by Spire Treasury Team`
          );
          console.log(`Transaction Validation Failed`);
          return false;
        }
      } else {
        console.log(
          `New User Transaction is not supplied by Spire Treasury Team`
        );
        console.log(`Transaction Validation Failed`);
        return false;
      }
    }

    console.log("Successful Transaction Validation");
    return true;
  } catch (error) {
    console.error("Error While Validating Transaction:", error);
  }
}

module.exports = TransactionValidation;
