require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Schemas = require("./Schemas/Schemas");

const dbUsername = process.env.dbUSERNAME;
const dbPassword = process.env.dbPASSWORD;
const dbName = process.env.dbNAME;

const uri = `mongodb://${dbUsername}:${dbPassword}@ac-n7xmp9d-shard-00-00.agdw1t4.mongodb.net:27017,ac-n7xmp9d-shard-00-01.agdw1t4.mongodb.net:27017,ac-n7xmp9d-shard-00-02.agdw1t4.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-8ikuez-shard-0&authSource=admin&retryWrites=true&w=majority`;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Creating Models

const UserModel = mongoose.model("User", Schemas.UserSchema);

// API Endpoints
app.post("/signup", async (req, res) => {
  try {
    console.log("Creating New User...");
    const accountNumber = "0000000000"; // Need to be randomly and uniquely generated
    const wiringCode = `W${accountNumber}`; // wiringCode = 'W' for 'Referral' as Prefix to account number
    const balanceID = `B${accountNumber}`; // balanceID = 'B' for 'Referral' as Prefix to account number
    const referralCode = `R${accountNumber}`; // referralCode = 'R' for 'Referral' as Prefix to account number
    const salt = await bcrypt.genSalt(5);
    const hashed = await bcrypt.hash(req.body.password, salt);
    console.log(req.body);

    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: req.body.fullName,
      password: hashed, // hash
      email: req.body.email,
      referredByCode: req.body.referredByCode,
      referralCode: referralCode,
      accountNumber: accountNumber,
      wiringCode: wiringCode,
      balance: {
        balanceID: balanceID,
        type: "Bronze",
        amount: 1000,
      },
    };
    const newUser = new UserModel(userData);
    await newUser.save();
    console.log(newUser);
    res.status(200).json({ msg: "User Created Successfully" });
  } catch (error) {
    console.error("Error getting count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// connect to the db
mongoose
  .connect(uri)
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
