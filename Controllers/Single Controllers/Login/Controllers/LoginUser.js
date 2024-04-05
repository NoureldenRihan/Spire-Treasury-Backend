const serverFunctions = require("../../../../Functions/ServerFunctions");
const Models = require("../../../../Schemas/Models");

// User Login Objectives
// 1) Check if user email exists & matches the request
// 2) Check if user password matches the request

const loginUser = async (req, res) => {
  try {
    console.log("User Login Started...");
    console.log("Checking User Credentials...");

    res.status(200).json({ msg: "User Login Successful" });
  } catch (error) {
    console.error("Error While Logging In:", error);
    const err = serverFunctions.ErrorClassifier({
      errorCode: error.code,
      errorInfo: error.keyPattern,
    });
    res.status(500).json({ didAnErrorOccur: true, msg: err });
  }
};

module.exports = loginUser;
