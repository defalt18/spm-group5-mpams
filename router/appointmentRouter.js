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

router.post('/monthly', isLoggedIn, monthAppointmentsForUser);

router.post("/monthly/:id", isLoggedIn, monthAppointmentsForWorkspace);

router.post("/:id", isLoggedIn, createAppointment);

router.post("/", isLoggedIn, fetchAppointmentsOfAUser);

router.post("/:id", isLoggedIn, fetchAppointmentsOfAWorkspace);

router.post("/update/:id", isLoggedIn, updateAppointment);

router.delete("/:id", isLoggedIn, deleteAppointment);

module.exports = router;
