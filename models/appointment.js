const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const Workspace = require("./workspace");

const appointmentSchema = new Schema({
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  requestedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace"
  },
  status: {
    confirmation: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "Pending",
    },
  },
  description: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["notUrgent", "medium", "urgent"],
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
