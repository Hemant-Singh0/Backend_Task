const req = require("express/lib/request");
const multer = require("multer");
const User = require("../../model/userAuthModel");

const findUser = async (req, res) => {
  try {
    const response = await User.findOne({ _id: req.params.id });
    return res.status(200).send({
      status: 200,
      message: " Get User Successfully",
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

const deleteUser = async (req, res) => {
  try {
    const response = await User.deleteOne({ _id: req.params.id });
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

const updateUser = async (req, res) => {
  try {
    const response = await User.updateOne({ _id: req.params.id }, req.body);
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

const getAllData = async (req, res) => {
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
    const response = await User.find()
      .sort({ votes: 1, _id: 1 })
      .limit(limit)
      .skip(skip);
    const counts = await User.find().count();
    return res.status(200).send({
      page,
      size,
      count: counts,
      status: 200,
      message: "Get Users Successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something Went Wrong to Fetched Users",
      error: err.message,
    });
  }
};

module.exports = {
  findUser,
  deleteUser,
  updateUser,
  getAllData,
};
