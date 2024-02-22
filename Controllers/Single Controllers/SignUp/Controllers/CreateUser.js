require("dotenv").config();
const bcrypt = require("bcrypt");
const TransactionStatusCodes = require("../../../../Constants/TransactionStatusCodes");
const TransactionTypes = require("../../../../Constants/TransactionTypes");
const serverFunctions = require("../../../../Functions/ServerFunctions");
const Models = require("../../../../Schemas/Models");

const SPAccNum = process.env.SPAccNum;
const SPBalanceID = process.env.SPBalanceID;

const createUser = async (req, res) => {
  try {
    console.log("Creating New User...");

    // Generate a random account number
    let trials = 0;
    let AccNumExists = true;
    let accountNumber;

    // Loops (At Max 3 Times) to generate a unique account number non existing in Account Number Collection
    // Otherwise, Loop Exits and Throws A Timout Error
    while (AccNumExists) {
      trials += 1;
      accountNumber = serverFunctions.generateAccountNumber();
      AccNumExists = await serverFunctions.AccountNumberDuplicateChecker(
        accountNumber
      );
      if (trials >= 3) {
        throw new Error("Account Number Loop Timeout");
      }
    }

    // Hash Password using bcrypt
    const salt = await bcrypt.genSalt(5);
    const hashed = await bcrypt.hash(req.body.password, salt);

    // Get Date and Time Info
    const dateTime = serverFunctions.DateTimeFunctions.getDateAndTime();
    const transactionTimeCode =
      serverFunctions.DateTimeFunctions.getTransactionDateTime(
        dateTime.date,
        dateTime.time
      );

    console.log(req.body);

    const transactionData = {
      code: `ST${accountNumber.slice(0, 2)}${transactionTimeCode}`,
      date: dateTime.date,
      time: dateTime.time,
      type: TransactionTypes.NEW_USER,
      statusCode: TransactionStatusCodes.PENDING, // Needs to be updated upon transaction confirmation
      total: 1000,
      amount: 1000,
      fees: 0,
      fromAccNum: SPAccNum,
      toAccNum: accountNumber,
      fromBalanceID: SPBalanceID,
      toBalanceID: `BB${accountNumber}`,
    };

    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: req.body.fullName,
      password: hashed,
      email: req.body.email,
      accountNumber: accountNumber,
      balance: {
        balanceID: `BB${accountNumber}`,
        type: "Bronze",
        amount: 1000,
      },
      transactions: transactionData,
    };

    const newAccountNumber = new Models.AccountNumberModel({
      accountNumber: userData.accountNumber,
    });
    await newAccountNumber.save();

    const newTransaction = new Models.TransactionModel(transactionData);
    await newTransaction.save();

    const newUser = new Models.UserModel(userData);
    await newUser.save();

    console.log(newAccountNumber);
    console.log(`Account Number ^^^^^^^^^^^^^^^^^^^^^^^^^`);
    console.log(newTransaction);
    console.log(`Transaction ^^^^^^^^^^^^^^^^^^^^^^^^^`);
    console.log(newUser);

    res.status(200).json({ msg: "User Created Successfully" });
  } catch (error) {
    console.error("Error getting count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = createUser;
