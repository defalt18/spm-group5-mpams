const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const passport = require("passport");
app = express();

const {
  googleCallbackHandler,
  registerHandler,
} = require("../controllers/authController");

const { isLoggedIn } = require("../middleware/isLoggedIn");

router.post("/google/callback", googleCallbackHandler);

router.post("/register", registerHandler);

module.exports = router;
