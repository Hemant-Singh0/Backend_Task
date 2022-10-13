const mongoose = require("mongoose");

// create an schema
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
});

// var userModel = mongoose.model("users", userSchema);

// module.exports = mongoose.model("Users", userModel);

module.exports = mongoose.model("Users", userSchema);
