const User = require("../models/user");
const Appointment = require("../models/appointment");
const Workspace = require("../models/workspace");
const _isEmpty = require("lodash/isEmpty");
const {request} = require("express");

const createAppointment = async (req, res) => {
    console.log(req.user);
    // return res.send("LOLOL")
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
    console.log(appt);
    res.send({
        message: "Created an Appointment",
        data: appt,
    });
};

const fetchAppointmentsOfAUser = async (req, res) => {
    const userAppointments = await Appointment.find({
        requestedBy: req.params.id,
    });
    res.send({
        message: "All the appointments are send",
        data: userAppointments,
    });
};

const fetchAppointmentsOfAWorkspace = async (req, res) => {
    const workspaceAppointments = await Appointment.find({
        requestedTo: req.params.id,
    });
    res.send({
        message: "All the appointments are send",
        data: workspaceAppointments,
    });
};

const updateAppointment = async (req, res) => {
    console.log("request", req.body)
    const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        {timestamp: req.body.timestamp}
    );
    res.send({
        message: "Updated the Appointment",
        data: updatedAppointment,
    });
};

const deleteAppointment = async (req, res) => {
    const appoint = await Appointment.findById(req.params.id);
    const ws = await Workspace.findById(appoint.requestedTo);
    const index = ws.appointments.indexOf(req.params.id);
    ws.appointments.splice(index, 1);

    const usr = await User.findById(appoint.requestedBy);
    const index1 = usr.appointments.indexOf(req.params.id);
    usr?.appointments.splice(index1, 1);

    const pro = await User.findById(appoint.requestedTo);
    const index2 = pro?.appointments.indexOf(req.params.id);
    pro?.appointments.splice(index2, 1);

    await ws.save();
    await usr.save();
    await Appointment.findByIdAndDelete(req.params.id);
    res.send({
        message: "Deletion Successful",
    });
};

const monthAppointmentsForUser = async (req, res) => {
    const {accountType, appointments} = req.user

    let allAppointments;

    if (accountType) {
        allAppointments = await Appointment.find({requestedTo: {$in: req.user.workspaceInfo}}).populate({path: "requestedBy"}).populate({
            path: "requestedTo", populate: {
                path: "userInfo"
            }
        });
    } else {
        allAppointments = await Appointment.find({requestedBy: req.user._id}).populate({path: "requestedBy"}).populate({
            path: "requestedTo", populate: {
                path: "userInfo"
            }
        });
    }
    console.log(allAppointments);
    // const compiledAppointments = await allAppointments.reduce( async (allData, app, index) => {
    //     const user = await User.findById(app.requestedBy)
    //     const workspace = await Workspace.findById(app.requestedTo)
    //     const profUser = await User.findById(workspace.userInfo)
    //     return [...(await allData), {...app, workspace, user, profUser}]
    // }, [])

    res.send({
        message: "Fetch Successful",
        data: allAppointments,
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
