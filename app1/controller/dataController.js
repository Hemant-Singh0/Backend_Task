const req = require("express/lib/request");
const multer = require("multer");
const User = require("../model/dataModel");
const Users = require("../model/authModel");
// const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const addUser = async (req, res) => {
  try {
    const user = {
      // _id: mongoose.Types.ObjectId(),
      // userId: "6315d173285ff85941bb7c95",
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      gender: req.body.gender,
    };

    const contact = await User.create(user);
    res.send({ message: "User Added Successfully", data: contact });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: error.message,
    });
  }
};

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

const deleteManyUser = async (req, res) => {
  try {
    const response = await User.deleteMany({ firstName: req.params.firstName });

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

const updateManyUser = async (req, res) => {
  try {
    const response = await User.updateMany(
      { email: /HS@gmail.com/ },
      { $set: { lastName: "Singh" } }
    );
    return res.status(200).send({
      status: 200,
      message: "All Updated Successfully",
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
    const response = await // User
    // .find()
    // .select("firstName lastName email")
    // .populate("userId", "email")
    // .populate("userData")
    // .populate({
    //   path: "users",
    //   match: { role: { $eq: "user" } },
    // })
    Users.aggregate([
      // { $limit: 2 },
      // { $match: { firstName: { $in: ["Hemant"] } } },
      // { $group: { _id: "$firstName" } },
      // $group: { _id: { firstName: "$firstName", lastName: "$lastName" } },
      // $count: "alldataCount",
      // { $count: "firstName" },
      {
        $lookup: {
          from: "datas",
          localField: "email",
          foreignField: "email",
          as: "anything",
        },
      },
    ])
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
      message: "Something went wrong, please try again later!!",
      error: err.message,
    });
  }
};

//single imageUpload stored from the local storage
const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      console.log(uniqueSuffix, "Files");
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  }),
}).single("uploads");

module.exports = {
  addUser,
  findUser,
  deleteUser,
  updateUser,
  getAllData,
  updateManyUser,
  deleteManyUser,
  imageUpload,
};
