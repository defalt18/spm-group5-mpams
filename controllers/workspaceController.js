const User = require("../models/user");
const Appointment = require("../models/appointment");
const Workspace = require("../models/workspace");

const createNewWorkspace = async (req, res) => {
  const { workspaceName, address, mobileNo, timings } = req.body;
  const newWorkspace = new Workspace({
    workspaceName,
    address,
    mobileNo,
    timings,
  });

  newWorkspace.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));

  newWorkspace.userInfo = req.user._id;
  console.log(newWorkspace);

  await newWorkspace.save();
  res.send({
    message: "Created New Workspace Succesfully",
    data: newWorkspace,
  });
};

const workspaceDetails = async (req, res) => {
  const workspaceData = await Workspace.findById(req.params.id);
  if (!workspaceData) {
    res.send({
      message: "Workspace Details not Found",
    });
  } else {
    res.send({
      message: "Workspace Details Obtained",
      data: workspaceData,
    });
  }
};

const updateWorkspace = async (req, res) => {
  const workspaceData = await Workspace.findById(req.params.id);
  if (!workspaceData) {
    return res.send({
      message: "Workspace Details not Found",
    });
  }

  const updatedWorkspace = await Workspace.findByIdAndUpdate(
    req.params.id,
    req.body.data
  );

  res.send({
    message: "Created New Workspace Succesfully",
    data: newWorkspace,
  });
};

const deleteWorkspace = async (req, res) => {
  const workspaceData = await Workspace.findById(req.params.id);
  if (!workspaceData) {
    return res.send({
      message: "Workspace Details not Found",
    });
  }

  if (workspaceDetails.userInfo == req.user._id) {
    const currUser = await User.findById(req.user._id);
    const index = currUser.workspaceInfo.indexOf(req.params.id);
    if (index > -1) {
      currUser.workspaceInfo.splice(index, 1);
    }
    await currUser.save();

    await Workspace.findByIdAndDelete(req.params.id);
    res.send({
      message: "Deleted Successfully!",
    });
  } else {
    res.send({
      message: "You are not the Owner of the workspace!",
    });
  }
};

module.exports = {
  createNewWorkspace,
  workspaceDetails,
  updateWorkspace,
  deleteWorkspace,
};
