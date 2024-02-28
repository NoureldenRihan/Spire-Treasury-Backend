const AdminSpecialCodes = require("../../Constants/AdminSpecialCodes");

// Based on Admin Special Codes, Classifies the User Type

function UserTypeClassifier(code) {
  if (AdminSpecialCodes[code] === undefined) {
    return "Normal";
  } else {
    return AdminSpecialCodes[code];
  }
}

module.exports = UserTypeClassifier;
