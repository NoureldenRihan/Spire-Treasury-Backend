const createUser = require("./Controllers/CreateUser");
const loginUser = require("./Controllers/LoginUser");
const getSingleUser = require("./Controllers/GetSingleUser");

// Users Controllers Grouper
const UsersControllers = {
  createUser,
  loginUser,
  getSingleUser,
};

module.exports = UsersControllers;
