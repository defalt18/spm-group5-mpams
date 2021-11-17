const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const Appointment = require("../models/appointment");
const Workspace = require("../models/workspace");
app = express();
const multer = require("multer");
const { storage } = require("../config/cloudniary");
const upload = multer({ storage });

const {
  createNewWorkspace,
  workspaceDetails,
  updateWorkspace,
  deleteWorkspace,
} = require("../controllers/workspaceController");

const { isLoggedIn } = require("../middleware/isLoggedIn");
const workspace = require("../models/workspace");

//createWorkspace
router.post("/", isLoggedIn, createNewWorkspace);

router.get("/:id", isLoggedIn, workspaceDetails);

router.post("/:id", isLoggedIn, updateWorkspace);

router.delete("/:id", isLoggedIn, deleteWorkspace);

module.exports = router;
