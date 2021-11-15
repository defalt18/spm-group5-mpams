const User = require("../models/user");
const Appointment = require("../models/appointment");
const Workspace = require("../models/workspace");

const createAppointment = async (req, res) => {
  const newAppointment = new Appointment({
    requestedBy: req.user._id,
    requestedTo: req.params.id,
    status: {
      confirmation: false,
      message: "Pending",
    },
    description: req.body.description,
    timestamp: req.body.timestamp,
    priority: req.body.priority,
  });

  const appt = await newAppointment.save();

  const ws = await Workspace.findById(req.params.id);
  const usr = await User.find(req.user._id);

  ws.appointments.push(appt._id);
  usr.appointments.push(appt._id);

  await ws.save();
  await usr.save();

  res.send({
    message: "Created an Appointment",
    data: appt,
  });
};

const fetchAppointmentsOfAUser = async (req, res) => {
  const userAppointments = await Appointment.findAll({
    requestedBy: req.params.id,
  });
  req.send({
    message: "All the appointments are send",
    data: userAppointments,
  });
};

const fetchAppointmentsOfAWorkspace = async (req, res) => {
  const workspaceAppointments = await Appointment.findAll({
    requestedTo: req.params.id,
  });
  req.send({
    message: "All the appointments are send",
    data: workspaceAppointments,
  });
};

const updateAppointment = async (req, res) => {
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.send({
    message: "Updated the Appointment",
    data: updateAppointment,
  });
};

const deleteAppointment = async (req, res) => {
  const appoint = await Appointment.findById(req.params.id);
  const ws = await Workspace.findById(appoint.requestedTo);
  const index = ws.appointments.indexOf(req.params.id);
  ws.appointments.slice(index, 1);

  const usr = await Workspace.findById(appoint.requestedBy);
  const index1 = usr.appointments.indexOf(req.params.id);
  ws.appointments.slice(index1, 1);

  await ws.save();
  await usr.save();
  await Appointment.findByIdAndDelete(req.params.id);
  res.send({
    message: "Deletion Successfull",
  });
};

const monthAppointmentsForUser = async (req, res) => {
  const allAppointments = await Appointment.find({
    id: req.user._id,
    timestamp: {
      $gte: new Date(
        new Date(`${req.body.year}-${req.body.month}-01`).setHours(00, 00, 00)
      ),
      $lt: new Date(
        new Date(`${req.body.year}-${req.body.month}-31`).setHours(23, 59, 59)
      ),
    },
  }).sort({ timestamp: "asc" });

  res.send({
    message: "Fetch Successfull",
    data: allAppointments,
  });
};

const monthAppointmentsForWorkspace = async (req, res) => {
  const allAppointments = await Appointment.find({
    id: req.params.id,
    timestamp: {
      $gte: new Date(
        new Date(`${req.body.year}-${req.body.month}-01`).setHours(00, 00, 00)
      ),
      $lt: new Date(
        new Date(`${req.body.year}-${req.body.month}-31`).setHours(23, 59, 59)
      ),
    },
  }).sort({ timestamp: "asc" });

  res.send({
    message: "Fetch Successfull",
    data: allAppointments,
  });
};

module.exports = {
  createAppointment,
  fetchAppointmentsOfAUser,
  fetchAppointmentsOfAWorkspace,
  updateAppointment,
  deleteAppointment,
  monthAppointmentsForUser,
  monthAppointmentsForWorkspace,
};
