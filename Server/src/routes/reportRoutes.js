const express = require("express");
const { reportsController } = require("../controllers");

const reportsRoutes = express.Router();

reportsRoutes.get("/", reportsController.getAllReportsController);
reportsRoutes.get("/:id", reportsController.getReportsInOneLocationController);
reportsRoutes.post("/", reportsController.insertNewReportController);
reportsRoutes.post("/vote", reportsController.submitVotingController);

module.exports = reportsRoutes;
