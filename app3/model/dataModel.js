const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    // imgPath: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("Data", userSchema);
module.exports = User;
