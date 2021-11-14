const User = require("../models/user");

const isLoggedIn = async (req, res, next) => {
  if (req.user && req.user._id) {
    const currUser = await User.findById(req.user._id);
    if (currUser == req.User) return next();
  } else {
    res.send({
      message: "You are not logged in",
      redirectTo: "/login",
    });
  }
};

module.exports = { isLoggedIn };
