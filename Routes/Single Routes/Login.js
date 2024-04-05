const express = require("express");
const router = express.Router();

const Controllers = require("../../Controllers/Controllers");

router.post("/", Controllers.LoginControllers.loginUser);

module.exports = router;
