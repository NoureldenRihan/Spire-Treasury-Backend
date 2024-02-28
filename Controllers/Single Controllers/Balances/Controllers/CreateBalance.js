const serverFunctions = require("../../../../Functions/ServerFunctions");
const Models = require("../../../../Schemas/Models");

// Balance Creation Objectives
// 1) Organize Data
// 2) Validate Balance
// 3) Create Balance and Update User

const CreateBalance = async (req, res) => {
  try {
    console.log("Creating New Balance...");

    // 1) Organize Data

    const balanceTier = serverFunctions.TierClassifier(req.body.type);

    const balanceData = {
      balanceID: `B${balanceTier}${req.body.accountNumber}`,
      type: req.body.type,
      amount: req.body.amount,
    };

    // 2) Validate Balance

    console.log("Proceeding to Validate Balance...");

    const isBalanceValid = await serverFunctions.BalanceValidation(balanceData);

    if (isBalanceValid) {
      // 3) Create Balance and Update User

      await Models.UserModel.find({
        accountNumber: req.body.AccNum,
      }).then((user) => {
        let currentUser = user[0];

        currentUser.balance.unshift(balanceData);

        currentUser
          .save()
          .then(() => console.log("Balance Created successfully"))
          .catch((err) => console.error("Error Creating Balance:", err));

        console.log(user);
      });
    } else {
      throw new Error("Invalid Balance Data");
    }

    res.status(200).json({ msg: "Balance Created Successfully" });
  } catch (error) {
    console.error("Error Creating Balance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = CreateBalance;
