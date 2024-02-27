const serverFunctions = require("../../../../Functions/ServerFunctions");
const Models = require("../../../../Schemas/Models");
const CurrencyConversionRates = require("../../../../Constants/CurrencyConversionRates");

// Needs to be Saved as a Transaction of type CV (Conversion)

const ConvertCurreny = async (req, res) => {
  try {
    console.log("Converting Currencies...");

    const currencyConversionData = {
      AccNum: req.body.AccNum,
      fromBalanceID: req.body.fromBalanceID,
      toBalanceID: req.body.toBalanceID,
      fromTier: req.body.fromTier,
      toTier: req.body.toTier,
      amount: req.body.amount,
    };

    const isCurrencyConversionValid =
      await serverFunctions.CurrencyConverionValidation(currencyConversionData);

    if (isCurrencyConversionValid) {
      await Models.UserModel.find({
        accountNumber: req.body.AccNum,
      }).then((user) => {
        let currentUser = user[0];
        let conversionCode = `${req.body.fromTier}To${req.body.toTier}`;
        let convertedAmount =
          currencyConversionData.amount *
          CurrencyConversionRates[conversionCode];

        currentUser.balance.forEach((balance) => {
          if (balance.type === req.body.fromTier) {
            balance.amount -= currencyConversionData.amount;
          } else if (balance.type === req.body.toTier) {
            balance.amount += convertedAmount;
          }
        });

        currentUser
          .save()
          .then(() => console.log("Currencies Converted successfully"))
          .catch((err) => console.error("Error Converting Currencies:", err));

        console.log(user);
      });
    } else {
      throw new Error("Invalid Currency Conversion Data");
    }

    res.status(200).json({ msg: "Currencies Converted Successfully" });
  } catch (error) {
    console.error("Error Converting Currencies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = ConvertCurreny;
