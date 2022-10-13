const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 5, max: 10 },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const User = mongoose.model("Admin", userSchema);
module.exports = User;
