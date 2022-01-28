const express = require("express");

const { admController } = require("../controllers");
const { protectMiddleware } = require("../middleware");
const { authMiddleware } = require("../middleware");

const admRoutes = express.Router();

admRoutes.get(
  "/",
  authMiddleware,
  protectMiddleware,
  admController.getUsersController
);

module.exports = admRoutes;
