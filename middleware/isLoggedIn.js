const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send({
      message: "You are not logged in",
      redirectTo: "/login",
    });
  }
};

module.exports = { isLoggedIn };
