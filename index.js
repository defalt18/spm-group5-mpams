//import packages
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//express middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// env variables
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;
const SECRET = process.env.SECRET;

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

const { isLoggedIn } = require("./middleware/isLoggedIn");

app.use((req, res, next) => {
  req.user = req.body.user;
  next();
});

const authRoutes = require("./router/authRoutes");
app.use("/api/auth", authRoutes);

const workspaceRoutes = require("./router/workspaceRouter");
app.use("/api/workspace", workspaceRoutes);

const appointmentRoutes = require("./router/appointmentRouter");
app.use("/api/appointment", appointmentRoutes);

//filter routes!!
const User = require("./models/user");

app.get("/api/profession", isLoggedIn, async (req, res) => {
  const allProfessions = await User.distinct("profession");
  res.send({
    message: "Here are all the Professions!!",
    data: allProfessions,
  });
});

//all the users with particular profession
app.get("/api/profession/:name", isLoggedIn, async (req, res) => {
  const allProfUser = await User.find({ profession: req.params.name });
  res.send({
    message: "Here are all the Professionals!!",
    data: allProfUser,
  });
});

app.get("/LOL", async (req, res) => {
  const newInfo = new User({
    email: "LOL3",
    name: "mahir",
    photo: "LOL",
    accountType: 1,
    profession: "asdfg",
  });
  newInfo.save();
  console.log("DONE!!");
  res.send(newInfo);
});

app.post("/api/searchUser/:profession", async (req, res) => {
  const search = req.body.searchString;
  if (req.params.profession === "all") {
    const users = await User.find({
      name: new RegExp("^" + search),
    });
    res.send({
      message: "Here are all the Professionals!!",
      data: users,
    });
  } else {
    const users = await User.find({
      profession: req.params.profession,
      name: new RegExp("^" + search),
    });
    res.send({
      message: "Here are all the Professionals!!",
      data: users,
    });
  }
});

app.get("/api/contacts", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user._id);
  const allAppointments = user.appointments;

  const newSet = new Set();
  for (let apt of allAppointments) {
    const ws = await Workspace.findById(apt.requestedTo);
    newSet.add(ws.userInfo);
  }

  let ctcs = [];
  for (let prof of newSet) {
    ctcs.push(await User.findById(prof));
  }

  res.send({
    messages: "Successful Fetch of Contacts!",
    data: ctcs,
  });
});

app.get("/api/allUsers", async (req, res) => {
  const data = await User.find({});
  res.send(data);
});

app.get("/", (req, res) => {
  return res.send("Started!");
});
