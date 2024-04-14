const serverFunctions = require("../../../../Functions/ServerFunctions");
const Models = require("../../../../Schemas/Models");

// Get Single User Objectives
// 1) Check if user email exists & matches the request
// 2) Return User Data

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

      // Stringifying and reParsing User Data to turn it into a object instead of a mongoDB Document
      let userData = JSON.stringify(user);
      userData = JSON.parse(userData);

      // Destructing password away from the secure user data for client side response
      const { password, ...secureUserData } = userData;

      console.log(secureUserData);

      res.status(200).json({
        msg: "User Found!",
        secureUserData,
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
