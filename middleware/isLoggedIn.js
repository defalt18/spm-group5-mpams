const User = require("../models/user");

const isLoggedIn = async (req, res, next) => {
  return next();

  if(req.user){
  return next();
  } else {
    res.send({
      message: "You are not logged in",
      redirectTo: "/login",
    });
  }
};

module.exports = { isLoggedIn };
