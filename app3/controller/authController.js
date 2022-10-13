const req = require("express/lib/request");
const User = require("../model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = "jwt";

const signup = async (req, res) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    const response = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: pass,
      number: req.body.number,
    };
    const resultt = await User.findOne({ email: response.email });
    if (resultt) {
      return res.send({
        status: 400,
        message: "Mail Already Exist!!!... Please Try Different Email",
      });
    } else {
      const user = await User.create(response);
      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, async (error, token) => {
        if (error) {
          return res.status(500).send({
            status: 500,
            message: "Something went wrong, please try after some time",
            error: error.message,
          });
        } else {
          res.send({
            status: 200,
            message: "User Registered Successfully",
            data: user,
            auth: token,
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try after some time",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const password = req.body.password;
    const respon = await User.findOne({ email: req.body.email });
    if (respon) {
      const response = {
        id: respon._id,
        email: respon.email,
      };
      const passchq = await bcrypt.compare(password, respon.password);
      if (passchq) {
        return res.status(200).send({
          status: 200,
          message: "Login successful",
          data: response,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: "Invalid password",
          data: response,
        });
      }
    } else {
      return res
        .status(300)
        .send({ status: 300, message: "Invalid User", error: error.message });
    }
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Invalid User",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
