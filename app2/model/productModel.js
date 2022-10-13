const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema(
  {
    product: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: String, required: true },
    imgPath: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
