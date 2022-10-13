const express = require("express");
const bodyParser = require("body-parser");
var morgan = require("morgan");
const dotenv = require("dotenv");
require("./app2/connection/dataBase");
const CONFIG = require("./config2.json");
require("./app2/mail/transporter");
var cors = require("cors");
const fileUpload = require("express-fileupload");
const socket = require("socket.io");

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

app.use("/user", require("./app2/routers/userAuthRouters"));
app.use("/admin", require("./app2/routers/adminAuthRouters"));
app.use("/data", require("./app2/routers/adminDataRouter"));
app.use("/product", require("./app2/routers/productRouter"));

const port = CONFIG.PORT || 5050;

app.get("/", (req, res) => res.send("Hello World with Express 2"));

const server = app.listen(port, function () {
  console.log(`Server is up and running on ${port}....`);
});

// const io = socket(server);
const io = socket(server, {
  cors: { origin: "*" },
});
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join_room", (data) => {
    console.log("join room", data);
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    console.log("send message", data);
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("Server is down");
  });
});

// const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10];
// const array2 = [1, 2, 3, 4, 5, 6, 7];

// const toFindDuplicates = (array1) =>
//   (array1 = array1.filter((val) => !array2.includes(val)));
// const duplicateElements = toFindDuplicates(array1);
// console.log(">>>>>>>", duplicateElements);
