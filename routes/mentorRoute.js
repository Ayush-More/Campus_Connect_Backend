const express = require("express");
const { availableUser } = require("../controller/mentorController");
const { protect } = require("../controller/authController");

const Router = express.Router();

Router.get("/fetchUsers", protect, availableUser);

module.exports = Router;
