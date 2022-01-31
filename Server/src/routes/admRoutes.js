const express = require("express");

const { admController } = require("../controllers");
const { protectMiddleware } = require("../middleware");
const { authMiddleware } = require("../middleware");

const admRoutes = express.Router();

admRoutes.get(
  "/users",
  authMiddleware,
  protectMiddleware,
  admController.getUsersController
);

admRoutes.get(
  "/hiddenLocation",
  authMiddleware,
  protectMiddleware,
  admController.getAllHiddenLocationsController
);

module.exports = admRoutes;
