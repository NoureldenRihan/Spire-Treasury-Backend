const ErrorMsgs = require("../../Constants/ErrorMsgs");

function ErrorClassifier(errorData) {
  // Checking for Duplicates
  // MongoDB error code for duplicates is 11000
  if (errorData.errorCode === 11000) {
    const duplicateField = Object.keys(errorData.errorInfo)[0];
    if (duplicateField === "email") {
      return ErrorMsgs.EmailDuplicate;
    } else if (duplicateField === "accountNumber") {
      return ErrorMsgs.AccountNumberDuplicate;
    }
  }
  return;
}

module.exports = ErrorClassifier;
