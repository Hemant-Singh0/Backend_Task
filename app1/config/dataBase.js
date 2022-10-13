const mongoose = require("mongoose");
const CONFIG = require("../../config.json");
mongoose.connect(CONFIG.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("debug", true);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Data Base Connection Successful!!!!!!!!");
});
