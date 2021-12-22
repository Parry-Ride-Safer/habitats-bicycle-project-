const express = require("express");
const { authController } = require("../controllers");

const authRoutes = express.Router();

authRoutes.post("/sessions", authController.userAuthenticationController);

module.exports = authRoutes;
