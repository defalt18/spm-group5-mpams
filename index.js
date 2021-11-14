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

//mongo store
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SECRET,
    store: MongoStore.create({
      mongoUrl: DB_URI,
      ttl: 12 * 60 * 60,
    }),
  })
);

const { isLoggedIn } = require("./middleware/isLoggedIn");

app.use((req, res, next) => {
  req.user = req.body.user;
});

const authRoutes = require("./router/authRoutes");
app.use("/api/auth", authRoutes);

const workspaceRoutes = require("./router/workspaceRouter");
app.use("/api/workspace", workspaceRoutes);

const appointmentRoutes = require("./router/appointmentRouter");
app.use("/api/appointment", appointmentRoutes);

const User = require("./models/user");

app.get("/api/profession", isLoggedIn, async (req, res) => {
  const allProfessions = await User.distinct("profession");
  res.send({
    message: "Here are all the Professions!!",
    data: allProfessions,
  });
});

app.get("api/profession/:name", isLoggedIn, async (req, res) => {
  const allProfUser = await User.find({ profession: req.params.name });
  res.send({
    message: "Here are all the Professionals!!",
    data: allProfUser,
  });
});

app.get("/api/allUsers", isLoggedIn, async (req, res) => {
  const data = await User.find({});
  res.send(data);
});

app.get("/", (req, res) => {
  res.send("Started!");
});
