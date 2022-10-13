const express = require("express");
const router = express.Router();
const productController = require("../controller/admin/productController");

router.post("/addProduct", productController.addProduct);
router.get("/get", productController.getAllProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.put("/update/:id", productController.updateProduct);

module.exports = router;
