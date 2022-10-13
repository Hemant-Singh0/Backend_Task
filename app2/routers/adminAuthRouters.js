const express = require("express");
const router = express.Router();
const userController = require("../controller/admin/adminAuthController");

router.post("/login", userController.login);
router.post("/signup", userController.signup);

module.exports = router;
