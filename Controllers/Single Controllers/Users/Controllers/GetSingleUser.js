const serverFunctions = require("../../../../Functions/ServerFunctions");
const Models = require("../../../../Schemas/Models");

// Get Single User Objectives
// 1) Check if user email exists & matches the request
// 2) Return User Data

//TODO Fix err msg for GetSingleUser.js & LoginUser.js

const getSingleUser = async (req, res) => {
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

      res.status(200).json({
        msg: "User Found!",
        user,
        // errorComparisonMsg: err,
      });
    });
  } catch (error) {
    console.error("Error While Retreiving User Data:", error);
    const err = serverFunctions.ErrorClassifier({
      errorCode: error.code,
      errorInfo: error.keyPattern,
    });
    res.status(500).json({ didAnErrorOccur: true, msg: err });
  }
};

module.exports = getSingleUser;
