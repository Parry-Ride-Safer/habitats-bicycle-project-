const express = require("express");
const { locationController } = require("../controllers");

const locationRoutes = express.Router();

locationRoutes.get("/", locationController.getAllLocationsController);

module.exports = locationRoutes;
