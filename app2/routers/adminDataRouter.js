const express = require("express");
const router = express.Router();
const userController = require("../controller/admin/adminDataController");

router.get("/get", userController.getAllData);
router.get("/getuser/:id", userController.findUser);
router.delete("/delete/:id", userController.deleteUser);
router.put("/update/:id", userController.updateUser);

module.exports = router;
