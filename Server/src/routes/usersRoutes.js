const express = require("express");
const { userController } = require("../controlers");

const userRoutes = express.Router();

userRoutes.get("/", userController.getUsersController);

module.exports = userRoutes;
