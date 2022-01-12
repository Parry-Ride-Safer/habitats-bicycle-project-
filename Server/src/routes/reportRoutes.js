const express = require("express");
const { reportsController } = require("../controllers");

const reportsRoutes = express.Router();

reportsRoutes.get("/", reportsController.getAllReportsController);
reportsRoutes.get("/:id", reportsController.getReportsInOneLocationController);
reportsRoutes.post("/", reportsController.insertNewReportController);

module.exports = reportsRoutes;
