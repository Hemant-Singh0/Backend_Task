const express = require("express");
const bodyParser = require("body-parser");
const port = 5000;
var morgan = require("morgan");

// create express app
const app = express();
app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./app/config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database....", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to My EasyNotes application.",
  });
});

require("./app/routes/note.routes.js")(app);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
