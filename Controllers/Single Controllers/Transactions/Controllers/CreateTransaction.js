require("dotenv").config();
const TransactionStatusCodes = require("../../../../Constants/TransactionStatusCodes");
const TransactionTypes = require("../../../../Constants/TransactionTypes");
const serverFunctions = require("../../../../Functions/ServerFunctions");
const Models = require("../../../../Schemas/Models");

const STAccNum = process.env.STAccNum;
const STBronzeBalanceID = process.env.STBronzeBalanceID;
const STSilverBalanceID = process.env.STSilverBalanceID;
const STGoldBalanceID = process.env.STGoldBalanceID;

const createTransaction = async (req, res) => {
  try {
    console.log("Making Transaction...");

    let feeTransactionData;

    // Get Date and Time Info
    const dateTime = serverFunctions.DateTimeFunctions.getDateAndTime();
    const transactionTimeCode =
      serverFunctions.DateTimeFunctions.getTransactionDateTime(
        dateTime.date,
        dateTime.time
      );

    const { transactionType } = req.body;
    const transactionTier = serverFunctions.TransactionTierClassifier(
      req.body.toBalanceID.slice(0, 2)
    );

    console.log(req.body);

    const transactionData = {
      code:
        transactionType === "NU"
          ? `ST${req.body.toAccNum.slice(0, 2)}${transactionTimeCode}`
          : `${req.body.fromAccNum.slice(0, 2)}${req.body.toAccNum.slice(
              0,
              2
            )}${transactionTimeCode}`,
      date: dateTime.date,
      time: dateTime.time,
      type:
        transactionType === "NU"
          ? TransactionTypes.NEW_USER
          : TransactionTypes.WIRE,
      statusCode: TransactionStatusCodes.PENDING,
      total: req.body.total,
      amount: req.body.amount,
      fees: req.body.fees,
      fromAccNum: transactionType === "NU" ? STAccNum : req.body.fromAccNum,
      toAccNum: req.body.toAccNum,
      fromBalanceID:
        transactionType === "NU" ? STBronzeBalanceID : req.body.fromBalanceID,
      toBalanceID: req.body.toBalanceID,
      tier: transactionTier,
    };

    console.log("Proceeding to Validate Transaction...");

    const isTransactionValid = await serverFunctions.TransactionValidation(
      transactionData
    );

    if (isTransactionValid) {
      const newTransaction = new Models.TransactionModel(transactionData);
      await newTransaction.save();

      console.log(newTransaction);
      console.log(`Transaction ^^^^^^^^^^^^^^^^^^^^^^^^^`);

      await Models.UserModel.find({
        accountNumber: transactionData.fromAccNum,
      }).then((user) => {
        let currentUser = user[0];
        let currentAmount;

        currentUser.balance.forEach((balance) => {
          if (balance.balanceID === transactionData.fromBalanceID) {
            currentAmount = balance.amount;
            balance.amount -= transactionData.total;
            if (currentAmount - transactionData.total !== balance.amount) {
              throw new Error("Error Applying Transaction");
            }
          }
        });

        let SuccessfulTransaction = transactionData;
        SuccessfulTransaction.statusCode = TransactionStatusCodes.SUCCESS;

        currentUser.transactions.unshift(SuccessfulTransaction);

        currentUser
          .save()
          .then(() => console.log("Transaction Paid successfully"))
          .catch((err) => console.error("Error saving transaction:", err));

        console.log(user);
      });

      await Models.UserModel.find({
        accountNumber: transactionData.toAccNum,
      }).then((user) => {
        let currentUser = user[0];
        let currentAmount;

        currentUser.balance.forEach((balance) => {
          if (balance.balanceID === transactionData.toBalanceID) {
            currentAmount = balance.amount;
            balance.amount += transactionData.total;
            if (currentAmount + transactionData.total !== balance.amount) {
              throw new Error("Error Applying Transaction");
            }
          }
        });

        let SuccessfulTransaction = transactionData;
        SuccessfulTransaction.statusCode = TransactionStatusCodes.SUCCESS;

        currentUser.transactions.unshift(SuccessfulTransaction);

        currentUser
          .save()
          .then(() => console.log("Transaction Received successfully"))
          .catch((err) => console.error("Error saving transaction:", err));

        console.log(user);
      });

      await Models.TransactionModel.findOne({
        code: transactionData.code,
      }).then((transaction) => {
        transaction.statusCode = TransactionStatusCodes.SUCCESS;
        transaction
          .save()
          .then(() => console.log("Transaction Updated successfully"))
          .catch((err) => console.error("Error Updating transaction:", err));
      });

      if (transactionType !== "NU") {
        await Models.UserModel.find({
          type: "SPIRE",
        }).then((user) => {
          let currentUser = user[0];
          let currentAmount;
          let spireBalanceID;

          switch (transactionTier) {
            case "Bronze":
              spireBalanceID = STBronzeBalanceID;
              break;
            case "Silver":
              spireBalanceID = STSilverBalanceID;
              break;
            case "Gold":
              spireBalanceID = STGoldBalanceID;
              break;
            default:
              spireBalanceID = undefined;
              break;
          }

          if (spireBalanceID !== undefined) {
            currentUser.balance.forEach((balance) => {
              if (balance.balanceID === spireBalanceID) {
                currentAmount = balance.amount;
                balance.amount += transactionData.fees;
                if (currentAmount + transactionData.fees !== balance.amount) {
                  throw new Error("Error Applying Transaction");
                }
              }
            });
          }

          const newDateTime =
            serverFunctions.DateTimeFunctions.getDateAndTime();
          const newTransactionTimeCode =
            serverFunctions.DateTimeFunctions.getTransactionDateTime(
              dateTime.date,
              dateTime.time
            );

          feeTransactionData = {
            code: `FFFF${newTransactionTimeCode}`,
            date: newDateTime.date,
            time: newDateTime.time,
            type: TransactionTypes.FEE,
            statusCode: TransactionStatusCodes.SUCCESS,
            total: transactionData.fees,
            amount: transactionData.fees,
            fees: 0,
            fromAccNum: req.body.fromAccNum,
            toAccNum: req.body.toAccNum,
            fromBalanceID: req.body.fromBalanceID,
            toBalanceID: req.body.toBalanceID,
            tier: transactionTier,
          };

          currentUser.transactions.unshift(feeTransactionData);

          currentUser
            .save()
            .then(() => console.log("Transaction Received successfully"))
            .catch((err) => console.error("Error saving transaction:", err));

          const feeTransaction = new Models.TransactionModel(
            feeTransactionData
          );

          feeTransaction
            .save()
            .then(() => console.log("Fee Transaction Received successfully"))
            .catch((err) =>
              console.error("Error saving fee transaction:", err)
            );

          console.log(feeTransaction);
          console.log(`Transaction ^^^^^^^^^^^^^^^^^^^^^^^^^`);

          console.log(user);
        });
      }
    } else {
      throw new Error("Invalid transaction");
    }

    res.status(200).json({ msg: "Successful Transaction" });
  } catch (error) {
    console.error("Error Making Transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = createTransaction;
