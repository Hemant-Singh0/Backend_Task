const express = require("express");
const router = express.Router();
const dataController = require("../controller/dataController");

router.post("/adddata", dataController.adddata);
router.delete("/delete/:id", dataController.deleteUser);
router.put("/update/:id", dataController.updateUser);
router.get("/get", dataController.getAllData);
router.get("/getUserId/:id", dataController.getUserId);

module.exports = router;
