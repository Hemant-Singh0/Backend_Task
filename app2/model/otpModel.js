const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    code: { type: String },
    expireIn: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("otp", userSchema, "otp");
module.exports = User;
