require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routeFunctions = require("./Routes/RoutesFunctions");
const Models = require("./Schemas/Models");

// Importing env Values
const dbUsername = process.env.dbUSERNAME;
const dbPassword = process.env.dbPASSWORD;
const dbName = process.env.dbNAME;

// Database Connection URI
const uri = `mongodb://${dbUsername}:${dbPassword}@ac-n7xmp9d-shard-00-00.agdw1t4.mongodb.net:27017,ac-n7xmp9d-shard-00-01.agdw1t4.mongodb.net:27017,ac-n7xmp9d-shard-00-02.agdw1t4.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-8ikuez-shard-0&authSource=admin&retryWrites=true&w=majority`;

// Initializing App and Port
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares configuration
app.use(cors());
app.use(express.json());

// API Endpoints
app.post("/signup", async (req, res) =>
  routeFunctions.signUp(req, res, Models)
);

// Database Connection
mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
