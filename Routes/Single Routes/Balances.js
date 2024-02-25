const express = require("express");
const router = express.Router();

const Controllers = require("../../Controllers/Controllers");

router.post("/", Controllers.BalanceControllers.CreateBalance);

module.exports = router;
