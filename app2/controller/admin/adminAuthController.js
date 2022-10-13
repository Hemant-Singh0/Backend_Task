const req = require("express/lib/request");
const User = require("../../model/adminAuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = "jwt";
const { registerEmail, loginEmail } = require("../../mail/sendMail");

const signup = async (req, res) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    const response = {
      userName: req.body.userName,
      email: req.body.email,
      password: pass,
    };
    const emails = req.body.email;
    const name = req.body.userName;
    const result = await User.findOne({ email: response.email });
    if (result) {
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
          await registerEmail({ emails, name });
          res.send({
            status: 200,
            message: "Admin Registered Successfully",
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
      const emails = respon.email;
      const name = respon.userName;
      const passchq = await bcrypt.compare(password, respon.password);
      if (passchq) {
        await loginEmail({ emails, name });
        return res
          .status(200)
          .send({ status: 200, message: "Login successful", data: response });
      } else {
        return res
          .status(400)
          .send({ status: 400, message: "Invalid password", data: response });
      }
    } else {
      return res
        .status(400)
        .send({ status: 400, message: "Invalid User", data: response });
    }
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try after some time",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
