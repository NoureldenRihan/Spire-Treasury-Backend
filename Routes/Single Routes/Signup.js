const express = require("express");
const router = express.Router();

const Controllers = require("../../Controllers/Controllers");

router.post("/", Controllers.SignUpControllers.createUser);

module.exports = router;
