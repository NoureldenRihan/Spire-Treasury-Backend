const serverFunctions = require("../../Functions/ServerFunctions");
const bcrypt = require("bcrypt");

async function signUp(req, res, dbModels) {
  try {
    console.log("Creating New User...");

    // Generate a random account number
    const accountNumber = serverFunctions.generateAccountNumber();

    // Hash Password using bcrypt
    const salt = await bcrypt.genSalt(5);
    const hashed = await bcrypt.hash(req.body.password, salt);

    console.log(req.body);

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
    };

    const newUser = new dbModels.UserModel(userData);
    await newUser.save();
    console.log(newUser);
    res.status(200).json({ msg: "User Created Successfully" });
  } catch (error) {
    console.error("Error getting count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = signUp;
