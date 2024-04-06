const serverFunctions = require("../../../../Functions/ServerFunctions");
const Models = require("../../../../Schemas/Models");

// User Login Objectives
// 1) Check if user email exists & matches the request
// 2) Return Hashed Password for Client Side Comparison

const loginUser = async (req, res) => {
  try {
    console.log("User Login Started...");
    console.log("Checking User Credentials...");

    // 1) Check if user email exists & matches the request
    await Models.UserModel.findOne({
      email: req.body.email,
    }).then(async (user) => {
      if (user === null) {
        console.log("User with supplied email not Found");
        const err = serverFunctions.ErrorClassifier({
          errorCode: "SP404",
          errorInfo: "email",
        });
        res.status(401).json({ didAnErrorOccur: true, msg: err });
        return;
      }

      console.log(user);

      // 2) Return Hashed Password for Client Side Comparison
      const dbPasswordHash = user.password;

      const err = serverFunctions.ErrorClassifier({
        errorCode: "SP404",
        errorInfo: "password",
      });

      res
        .status(200)
        .json({
          msg: "User Login Successful",
          dbPasswordHash,
          errorComparisonMsg: err,
        });
    });
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
