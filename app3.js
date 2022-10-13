const express = require("express");
const bodyParser = require("body-parser");
var morgan = require("morgan");
const dotenv = require("dotenv");
require("./app3/connection/dataBase");
const CONFIG = require("./config3.json");
var cors = require("cors");
const fileUpload = require("express-fileupload");

const jwt = require("jsonwebtoken");

const jwtKey = "jwt";

const app = express();
app.use(morgan("dev"));
dotenv.config();

app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", require("./app3/routers/authRouters"));
app.use("/data", require("./app3/routers/dataRouter"));

const port = CONFIG.PORT || 5500;

app.get("/", (req, res) => res.send("Hello World with Express 3"));

const server = app.listen(port, function () {
  console.log(`Server is up and running on ${port}....`);
});
