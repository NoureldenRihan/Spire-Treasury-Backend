const serverFunctions = require("../../../../Functions/ServerFunctions");
const Models = require("../../../../Schemas/Models");

const CreateBalance = async (req, res) => {
  try {
    console.log("Creating New Balance...");

    const balanceTier = serverFunctions.TierClassifier(req.body.type);

    const balanceData = {
      balanceID: `B${balanceTier}${req.body.AccNum}`,
      type: req.body.type,
      amount: req.body.amount,
    };

    console.log("Proceeding to Validate Balance...");

    const isBalanceValid = await serverFunctions.BalanceValidation(balanceData);

    if (isBalanceValid) {
      await Models.UserModel.find({
        accountNumber: req.body.AccNum,
      }).then((user) => {
        let currentUser = user[0];

        currentUser.balance.unshift(balanceData);

        currentUser
          .save()
          .then(() => console.log("Balance Created successfully"))
          .catch((err) => console.error("Error saving transaction:", err));

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
