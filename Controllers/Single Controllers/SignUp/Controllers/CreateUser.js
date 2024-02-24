const bcrypt = require("bcrypt");
const serverFunctions = require("../../../../Functions/ServerFunctions");
const Models = require("../../../../Schemas/Models");

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

    console.log(req.body);

    const userType = serverFunctions.UserTypeAssigner(req.body.specialCode);

    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: req.body.fullName,
      password: hashed,
      email: req.body.email,
      accountNumber: accountNumber,
      type: userType,
      balance: {
        balanceID: `BB${accountNumber}`,
        type: "Bronze",
        amount: 1000,
      },
    };

    const newAccountNumber = new Models.AccountNumberModel({
      accountNumber: userData.accountNumber,
    });
    await newAccountNumber.save();

    const newUser = new Models.UserModel(userData);
    await newUser.save();

    console.log(newAccountNumber);
    console.log(`Account Number ^^^^^^^^^^^^^^^^^^^^^^^^^`);
    console.log(newUser);

    res.status(200).json({ msg: "User Created Successfully" });
  } catch (error) {
    console.error("Error Creating User:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = createUser;
