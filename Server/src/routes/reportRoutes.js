const express = require("express");
const { reportsController } = require("../controllers");
const { authMiddleware } = require("../middleware");

const reportsRoutes = express.Router();

reportsRoutes.get("/", reportsController.getAllReportsController);
reportsRoutes.get("/:id", reportsController.getReportsInOneLocationController);
reportsRoutes.post(
  "/",
  authMiddleware,
  reportsController.insertNewReportController
);
reportsRoutes.put("/:id", reportsController.updateReportController);
reportsRoutes.post(
  "/:reportId/vote",
  authMiddleware,
  reportsController.submitVotingController
);
reportsRoutes.put(
  "/:reportId/vote",
  authMiddleware,
  reportsController.updateVoteController
);

module.exports = reportsRoutes;
