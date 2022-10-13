const req = require("express/lib/request");
const Product = require("../../model/productModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "df6ycegni",
  api_key: "483586693864986",
  api_secret: "gyGZlNSySX5U-yhJMLnPcEaIrGM",
  secure: true,
});

const addProduct = (req, res) => {
  try {
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      const user = {
        product: req.body.product,
        brand: req.body.brand,
        price: req.body.price,
        imgPath: result.url,
      };
      const contact = await Product.create(user);
      res.send({ message: "Product Added Successfully", data: contact });
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Something went wrong, Product Not Added Successfully",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const response = await Product.deleteOne({ _id: req.params.id });
    return res.status(200).send({
      status: 200,
      message: " Deleted Successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const response = await Product.updateOne({ _id: req.params.id }, req.body);
    return res
      .status(200)
      .send({ status: 200, message: "Updated Successfully", data: response });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    let { page, size, sort } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    const response = await Product.find()
      .sort({ votes: 1, _id: 1 })
      .limit(limit)
      .skip(skip);
    const counts = await Product.find().count();
    return res.status(200).send({
      page,
      size,
      count: counts,
      status: 200,
      message: "Get Products Successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something Went Wrong to Fetched Products",
      error: err.message,
    });
  }
};

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
};
