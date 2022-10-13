const express = require("express");
const bodyParser = require("body-parser");
// const port = 5000;
var morgan = require("morgan");
const dotenv = require("dotenv");
require("./app1/config/dataBase");
const CONFIG = require("./config.json");
require("./app1/mail/transporter");
var cors = require("cors");
const multer = require("multer");

const jwt = require("jsonwebtoken");

const jwtKey = "jwt";

const app = express();
app.use(morgan("dev"));
dotenv.config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/data", require("./app1/routers/dataRouters"));
app.use("/user", require("./app1/routers/authRouters"));

const port = CONFIG.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World with Express"));

app.listen(port, function () {
  console.log(`Server is up and running on ${port}....`);
});
