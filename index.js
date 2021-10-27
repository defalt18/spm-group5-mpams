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

//passport oauth
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
const googleStrategy = require("passport-google-oauth20").Strategy;
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new googleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

const { isLoggedIn } = require("./middleware/isLoggedIn");

const authRoutes = require("./router/authRoutes");
app.use("/api/auth", authRoutes);

const User = require("./models/user");
app.get("/api/allUsers", isLoggedIn, async (req, res) => {
  const data = await User.find({});
  res.send(data);
});

app.get("/", (req, res) => {
  res.send("Started!");
});
