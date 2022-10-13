const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    gender: { type: String, trim: true },
    // createdAt: Date,
    // updatedAt: Date,
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    // collection: "datas",
    // toJSON: { virtual: true },
    // ObjectId: { virtual: true },
  }
);
// UserSchema.virtual("users", {
//   ref: "User",
//   localField: "userId",
//   foreignField: "_id",
//   options: { match: { role: { $eq: "user" } } },
// });

// UserSchema.virtual("userData", {
//   ref: "User",
//   localField: "_id",
//   foreignField: "dataId",
// });

const User = mongoose.model("data", UserSchema);
module.exports = User;
