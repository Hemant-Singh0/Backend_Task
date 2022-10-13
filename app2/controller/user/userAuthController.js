const req = require("express/lib/request");
const User = require("../../model/userAuthModel");
const Otp = require("../../model/otpModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = "jwt";
const {
  registerEmail,
  loginEmail,
  otpEmail,
  changePasswordEmail,
} = require("../../mail/sendMail");
const Product = require("../../model/productModel");
const crypto = require("crypto");
const accountSid = "ACafbd5475ebc0e83f4ecbd1ab15af968a";
const authToken = "ed448c359b015e18d61606d9c2191d7c";
// const smsKey = process.env.SMS_SECRET_KEY;
let twilioNum = "+18156571677";
const client = require("twilio")(accountSid, authToken);

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

const sendTestMessage = (req, res) => {
  console.log("Sending test message...", req.body);
  const phone = req.body.phone;
  const otp = Math.floor(100000 + Math.random() * 900000); // generate OTP
  const ttl = 2 * 60 * 1000; // OTP expire time
  let expires = Date.now();
  expires += ttl;
  const data = `${phone}.${otp}.${expires}`;
  // const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
  // const fullHash = `${hash}.${expires}`;
  client.messages
    .create({
      body: `Your OTP ${otp}`,
      from: twilioNum,
      to: phone,
    })
    .then((messages) => {
      res.status(200).json({ phone, otp });
    })
    .catch((err) => {
      console.error("phone : ", err.message);
      return res.json({ error: err.message });
    });
};

const resetPassword = async (req, res) => {
  try {
    email = req.body.email;
    const data = await Otp.findOne({
      email: email,
      code: req.body.otpCode,
    });
    const response = {};
    if (data) {
      const currentTime = new Date().getTime();
      const diff = data.expireIn - currentTime;
      if (diff < 0) {
        response.status = "error";
        response.message = "OTP Expire";
      } else {
        const user = await User.findOne({ email: email });
        user.password = req.body.password;
        await changePasswordEmail({ email });
        user.save();
        response.status = "Successful";
        response.message = "Password changed successfully";
      }
    } else {
      response.status = "error";
      response.message = "Invalid OTP";
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Something Went Wrong Can`t Change Password.",
      error: error.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    const responsetype = {};
    if (data) {
      const otpcode = Math.floor(Math.random() * 10000 + 1);
      const email = req.body.email;
      const otpData = new Otp({
        email: email,
        code: otpcode,
        expiresIn: new Date().getTime() + 300 * 1000,
      });
      await otpEmail({ email, otpcode });
      const otpResponse = await otpData.save();
      responsetype.statustext = "Successfully";
      responsetype.message = "Please check your email";
    } else {
      responsetype.statustext = "Error";
      responsetype.message = "Email address is not valid.";
    }
    res.status(200).json(responsetype);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Something Went Wrong Can`t Send Email",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  getAllProduct,
  sendTestMessage,
  resetPassword,
  forgetPassword,
};
