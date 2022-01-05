const express = require("express");

const { authController } = require("../controllers");
const { authMiddleware } = require("../middleware/index.js");

const authRoutes = express.Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/logout", authMiddleware, authController.logout);

module.exports = authRoutes;
