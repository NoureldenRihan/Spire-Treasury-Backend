require("dotenv").config();
const TransactionStatusCodes = require("../../../../Constants/TransactionStatusCodes");
const TransactionTypes = require("../../../../Constants/TransactionTypes");
const serverFunctions = require("../../../../Functions/ServerFunctions");
const Models = require("../../../../Schemas/Models");

const STAccNum = process.env.STAccNum;
const STBalanceID = process.env.STBalanceID;

const createTransaction = async (req, res) => {
  try {
    console.log("Making Transaction...");

    // Get Date and Time Info
    const dateTime = serverFunctions.DateTimeFunctions.getDateAndTime();
    const transactionTimeCode =
      serverFunctions.DateTimeFunctions.getTransactionDateTime(
        dateTime.date,
        dateTime.time
      );

    const { transactionType } = req.body;

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
      statusCode: TransactionStatusCodes.PENDING, // Needs to be updated upon transaction confirmation
      total: req.body.total,
      amount: req.body.amount,
      fees: req.body.fees,
      fromAccNum: transactionType === "NU" ? STAccNum : req.body.fromAccNum,
      toAccNum: req.body.toAccNum,
      fromBalanceID:
        transactionType === "NU" ? STBalanceID : req.body.fromBalanceID,
      toBalanceID: req.body.toBalanceID,
    };

    console.log("Proceeding to Pre Validate Transaction...");

    const isTransactionValid = await serverFunctions.TransactionPreValidation(
      transactionData
    );

    if (isTransactionValid) {
      const newTransaction = new Models.TransactionModel(transactionData);
      await newTransaction.save();
      console.log(newTransaction);
      console.log(`Transaction ^^^^^^^^^^^^^^^^^^^^^^^^^`);
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
