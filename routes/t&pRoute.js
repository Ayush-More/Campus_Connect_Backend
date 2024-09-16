const express = require("express");
const tnpController = require("../controller/t&pController");
const authController = require("../controller/authController");

const Router = express.Router();

Router.use(authController.protect);
Router.get("/available", tnpController.internship).post(
  "/new",
  tnpController.addInternship
);

module.exports = Router;
