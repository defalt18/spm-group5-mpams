const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const passport = require("passport");
require("../config/passport");
app = express();

const {
  googleCallbackHandler,
  registerHandler,
  logoutHandler,
} = require("../controllers/authController");

const { isLoggedIn } = require("../middleware/isLoggedIn");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google"),
  googleCallbackHandler
);

router.post("/register", isLoggedIn, registerHandler);

router.get("/logout", isLoggedIn, logoutHandler);

module.exports = router;
