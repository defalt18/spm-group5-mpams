const User = require("../models/user");

const googleCallbackHandler = async (req, res) => {
  const info = await User.findOne({ email: req.user.emails[0].value });
  if (!info) {
    const newUser = new User({
      email: req.user.emails[0].value,
      name: req.user.displayName,
      accountType: -1,
      photo: req.user.photos[0].value,
    });
    await newUser.save();
    res.send({
      message: "RegisteredSuccessfully",
      data: newUser,
      redictedTo: "/register",
    });
  } else if (info.accountType == -1) {
    res.send({
      message: "Logged In Successfully",
      data: info,
      redictedTo: "/register",
    });
  } else {
    res.send({
      message: "Logged In Successfully",
      data: info,
      redictedTo: "/dashboard",
    });
  }
};

const registerHandler = async (req, res) => {
  const newData = JSON.parse(req.body);
  const data = await User.findOneAndUpdate(
    { email: req.user.emails[0].value },
    newData
  );
  res.send({
    message: "Logged In Successfully",
    data,
    redictedTo: "/dashboard",
  });
};

const logoutHandler = (req, res) => {
  req.logout();
  res.send({ message: "Logged Out Successfully", redirectTo: "/" });
};

module.exports = { googleCallbackHandler, registerHandler, logoutHandler };
