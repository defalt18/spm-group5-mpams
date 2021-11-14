const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const Workspace = require("./workspace");

const appointmentSchema = new Schema({
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requestedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  status: {
    confirmation: {
      type: Boolean,
      required: true,
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
    required: true,
  },
  priority: {
    type: String,
    enum: ["notUrgent", "medium", "urgent"],
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
