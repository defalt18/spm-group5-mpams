//import packages
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//express middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// env variables
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

//require models
const User = require("./models/user");

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log("Database Connected!", "Listening on Port " + PORT)
    )
  );

app.get("/api/allUsers", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("Started!");
});
