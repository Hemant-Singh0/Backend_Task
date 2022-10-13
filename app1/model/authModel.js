const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    gender: String,
    role: { type: String, rnam: ["user", "admin"], default: "user" },
    createdAt: Date,
    updatedAt: Date,
    // dataId: { type: "ObjectId", ref: "data" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
