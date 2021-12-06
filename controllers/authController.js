const User = require("../models/user");

const googleCallbackHandler = async (req, res) => {
  const info = await User.findOne({ email: req.user.email }).populate(
      {path: "workspaceInfo"}
  );
  if (!info) {
    const newUser = new User({
      email: req.user.email,
      name: req.user.name,
      accountType: -1,
      photo: req.user.photo,
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
  const newData = req.body.user;
  const data = await User.findOneAndUpdate(
    { email: req.user.email },
    newData
  );
  res.send({
    message: "Logged In Successfully",
    data,
    redictedTo: "/dashboard",
  });
};

module.exports = { googleCallbackHandler, registerHandler };
