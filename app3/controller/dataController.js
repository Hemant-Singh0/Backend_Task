const req = require("express/lib/request");
const User = require("../model/dataModel");

const adddata = async (req, res) => {
  try {
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      number: req.body.number,
      email: req.body.email,
    };

    const contact = await User.create(user);
    res.send({ message: "Product Added Successfully", data: contact });
    // });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Something went wrong, Product Not Added Successfully",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  console.log("deleteUser", req.params.id, "deleteUser", req.body.id);
  try {
    const response = await User.deleteOne({ _id: req.params.id });
    return res.status(200).send({
      status: 200,
      message: "Deleted Successfully",
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
    const response = await User.updateOne({ _id: req.body._id }, req.body);
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

// const getAllData = async (req, res) => {
//   try {
//     const { count, page } = req.query;
//     if (!count || !page)
//       return res.status(400).send({ error: "Missing Query Parameters" });

//     const countInt = parseInt(count);
//     const pageInt = parseInt(page);
//     const offset = countInt * pageInt;

//     if (isNaN(countInt) || isNaN(pageInt))
//       return res
//         .status(400)
//         .send({ error: "Invalid Value for Query Parameters" });

//     if (countInt <= 0 || pageInt < 0)
//       return res
//         .status(400)
//         .send({ error: "Query Parameters cannot contain negative value!" });

//     const response = await User.find();
//     const [results, total] = await User.find().count({
//       take: countInt,
//       skip: offset,
//     });
//     return res.status(200).send({
//       // page,
//       // size,
//       results,
//       total,
//       status: 200,
//       message: "Get Users Successfully",
//       data: response,
//     });
//   } catch (err) {
//     return res.status(500).send({
//       status: 500,
//       message: "Something went wrong, please try again later!!",
//       error: err.message,
//     });
//   }
// };
const getAllData = async (req, res) => {
  try {
    let { page, size, sort } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 2;
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
      message: "Something went wrong, please try again later!!",
      error: err.message,
    });
  }
};

// const getAllData = async (req, res) => {
//   try {
//     const response = await User.find();
//     return res.status(200).send({
//       status: 200,
//       message: "Get Users Successfully",
//       data: response,
//     });
//   } catch (err) {
//     return res.status(500).send({
//       status: 500,
//       message: "Something went wrong, please try again later!!",
//       error: err.message,
//     });
//   }
// };

const getUserId = async (req, res) => {
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

module.exports = {
  adddata,
  deleteUser,
  updateUser,
  getAllData,
  getUserId,
};
