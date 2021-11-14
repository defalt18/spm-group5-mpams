const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const Appointment = require("./appointment");

const workspaceSchema = new Schema({
  workspaceName: {
    type: String,
    default: "workspace",
  },
  address: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  timings: {
    type: String,
  },
  imagesUris: [
    {
      type: String,
    },
  ],
  userInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

module.exports = mongoose.model("Workspace", workspaceSchema);
