const mongoose = require("mongoose");
const { Schema } = mongoose;
const Workspace = require("./workspace");
const Appointment = require("./appointment");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
    required: true,
  },
  accountType: {
    type: Number,
    required: true,
    default: -1,
  },
  profession: {
    type: String,
  },
  workspaceInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
