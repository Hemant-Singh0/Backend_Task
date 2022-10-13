const express = require("express");
const router = express.Router();
const userController = require("../controller/dataController");

router.post("/adduser", userController.addUser);
router.get("/getuser/:id", userController.findUser);
router.delete("/delete/:id", userController.deleteUser);
router.delete("/deletemany/:firstName", userController.deleteManyUser);
router.put("/update/:id", userController.updateUser);
router.put("/updatemany/:id", userController.updateManyUser);
router.get("/get", userController.getAllData);
router.post("/upload", userController.imageUpload);
// http://localhost:5000/data/get?page=3&size=4

module.exports = router;
