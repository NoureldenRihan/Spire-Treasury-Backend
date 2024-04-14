const express = require("express");
const router = express.Router();

const Controllers = require("../../Controllers/Controllers");

router.post("/signup", Controllers.UsersControllers.createUser);
router.post("/login", Controllers.UsersControllers.loginUser);
router.post("/user", Controllers.UsersControllers.getSingleUser);

module.exports = router;
