const express = require("express");
const router = express.Router();
const userController = require("../controller/user/userAuthController");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/get", userController.getAllProduct);
router.post("/otp", userController.sendTestMessage);
router.post("/resetpassword", userController.resetPassword);
router.post("/forgetpassword", userController.forgetPassword);

module.exports = router;
