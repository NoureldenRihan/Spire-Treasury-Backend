const AdminSpecialCodes = require("../../Constants/AdminSpecialCodes");

function UserTypeAssigner(code) {
  if (AdminSpecialCodes[code] === undefined) {
    return "Normal";
  } else {
    return AdminSpecialCodes[code];
  }
}

module.exports = UserTypeAssigner;
