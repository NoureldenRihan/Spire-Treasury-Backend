const ErrorMsgs = require("../../Constants/ErrorMsgs");

// Errors Guide
// MongoDB Errors:
//        1) Code 11000 -> Duplicate key
// Other Errors:
//        2) Code SP404 -> Item not found

function ErrorClassifier(errorData, dbError = false) {
  if (dbError) {
    // Checking for Duplicates
    if (errorData.errorCode === 11000) {
      const duplicateField = Object.keys(errorData.errorInfo)[0];
      if (duplicateField === "email") {
        return ErrorMsgs.EmailDuplicate;
      } else if (duplicateField === "accountNumber") {
        return ErrorMsgs.AccountNumberDuplicate;
      }
    }
  } else {
    if (errorData.errorCode === "SP404") {
      if (errorData.errorInfo === "email") {
        return ErrorMsgs.UserNotFound;
      }
      if (errorData.errorInfo === "password") {
        return ErrorMsgs.InvalidPassword;
      }
    }
  }

  return;
}

module.exports = ErrorClassifier;
