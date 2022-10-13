const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 5, max: 10 },
    number: { type: String, required: true },
    // imgPath: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
