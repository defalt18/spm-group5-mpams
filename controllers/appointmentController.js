const User = require("../models/user");
const Appointment = require("../models/appointment");
const Workspace = require("../models/workspace");
const _isEmpty = require("lodash/isEmpty");

const createAppointment = async (req, res) => {
    console.log(req.user);
    const newAppointment = new Appointment({
        status: {
            confirmation: false,
            message: "Pending",
        },
        description: req.body.description,
        timestamp: req.body.timestamp,
        priority: req.body.priority,
    });

    const ws = await Workspace.findById(req.params.id);
    const usr = await User.findOne({email: req.user.email});
    const profUsr = await User.findOne({email: req.body.professionalEmail});

    newAppointment.requestedBy = usr._id;
    newAppointment.requestedTo = ws._id;

    const appt = await newAppointment.save();

    ws.appointments.push(appt._id);
    usr.appointments.push(appt._id);
    profUsr.appointments.push(appt._id);

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
    console.log(appoint);
    const ws = await Workspace.findById(appoint.requestedTo);
    const index = ws.appointments.indexOf(req.params.id);
    ws.appointments.slice(index, 1);

    const usr = await User.findById(appoint.requestedBy);
    const index1 = usr.appointments.indexOf(req.params.id);
    ws.appointments.slice(index1, 1);

    await ws.save();
    await usr.save();
    await Appointment.findByIdAndDelete(req.params.id);
    res.send({
        message: "Deletion Successful",
    });
};

const monthAppointmentsForUser = async (req, res) => {
    const allAppointments = await Appointment.find({
        email: req.user.email,
    }).sort({timestamp: "asc"});

    const compiledAppointments = await allAppointments.reduce( async (allData, app, index) => {
        const user = await User.findById(app.requestedBy)
        const workspace = await Workspace.findById(app.requestedTo)
        const profUser = await User.findById(workspace.userInfo)
        return [...(await allData), {...app, workspace, user, profUser}]
    }, [])

    res.send({
        message: "Fetch Successful",
        data: compiledAppointments,
    });
};

const monthAppointmentsForWorkspace = async (req, res) => {
    const {year, month} = req.body;
    const allAppointments = await Appointment.find({
        id: req.params.id,
        timestamp: {
            $gte: new Date(year, month, 1),
            $lte: new Date(year, month, 31),
        },
    }).sort({timestamp: "asc"});

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
