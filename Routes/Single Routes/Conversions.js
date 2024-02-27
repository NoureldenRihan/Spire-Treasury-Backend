const express = require("express");
const router = express.Router();

const Controllers = require("../../Controllers/Controllers");

router.post("/", Controllers.ConversionControllers.ConvertCurreny);

module.exports = router;
