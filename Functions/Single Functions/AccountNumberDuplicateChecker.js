const Models = require("../../Schemas/Models");

// Checks if the newly generated Account Number Exists in the Account Numbers Collection
async function AccountNumberDuplicateChecker(AccNum) {
  try {
    const user = await Models.UserModel.findOne({ accountNumber: AccNum });
    if (user) {
      console.log(`Account Number ${AccNum} already exists`);
      return true;
    } else {
      console.log(`Account Number ${AccNum} Successfully Registered`);
      return false;
    }
  } catch (error) {
    console.error("Error Checking Account Number for Duplicates:", error);
  }
}

module.exports = AccountNumberDuplicateChecker;
