const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const Appointment = require("../models/appointment");
const Workspace = require("../models/workspace");

const passport = require("passport");
app = express();

const {
  createAppointment,
  fetchAppointmentsOfAUser,
  fetchAppointmentsOfAWorkspace,
  updateAppointment,
  deleteAppointment,
  monthAppointmentsForUser,
  monthAppointmentsForWorkspace,
} = require("../controllers/appointmentController");
const { isLoggedIn } = require("../middleware/isLoggedIn");

router.post("/:id", isLoggedIn, createAppointment);

router.get("/", isLoggedIn, fetchAppointmentsOfAUser);

router.get("/:id", isLoggedIn, fetchAppointmentsOfAWorkspace);

router.put("/:id", isLoggedIn, updateAppointment);

router.delete("/:id", isLoggedIn, deleteAppointment);

router.get("/monthly", isLoggedIn, monthAppointmentsForUser);

router.get("/monthly/:id", isLoggedIn, monthAppointmentsForWorkspace);

module.exports = router;
