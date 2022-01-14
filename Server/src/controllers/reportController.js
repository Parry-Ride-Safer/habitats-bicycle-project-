const { reportsModels } = require("../models");

const getAllReportsController = async (req, res) => {
  try {
    const reports = await reportsModels.getAllReports();
    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
  }
};

const getReportsInOneLocationController = async (req, res) => {
  const locationId = req.params.id;
  try {
    const results = await reportsModels.getReportsInOneLocation(locationId);
    if (!results.length) throw new Error("NO_LOCATION");
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    if ("NO_LOCATION")
      res.status(404).send("No Location with the requested id");
    else res.status(500).send("Error in information retrieval");
  }
};

const insertNewReportController = async (req, res) => {
  const { lat, lng } = req.body;
  let address_id = req.body.address_id;

  try {
    if (!address_id) {
      let location = await reportsModels.findLocation(lat, lng);
      if (!location) location = await reportsModels.createLocation(lat, lng);
      address_id = location.id;
    }
    const createdReport = await reportsModels.createReport({
      ...req.body,
      address_id,
    });
    if (!createdReport) throw new Error("INVALID_DATA");
    res.status(201).json(createdReport);
  } catch (error) {
    console.log(error);
    if ("INVALID_DATA") res.status(400).send("Missing data");
    else res.status(500).send("Error saving Location");
  }
};

const updateReportController = async (req, res) => {
  const reportId = req.params.id;
  let existingReport, report;
  try {
    existingReport = await reportsModels.getReportById(reportId);
    if (!existingReport) throw new Error("RECORD_NOT_FOUND");
    report = await reportsModels.updateReport(req.body, reportId);

    if (report === 1) res.status(200).json({ ...existingReport, ...req.body });
    else throw new Error("NO_UPDATE");
  } catch (error) {
    console.error(error);
    if ("NO_UPDATE") res.status(400).send("No new info");
    else if ("RECORD_NOT_FOUND")
      res.status(404).send(`report with id ${reportId} not found.`);
    else res.status(500).send("Error updating a user");
  }
};

const updateVoteController = async (req, res) => {
  const { reportId } = req.params;
  let existingReport, report;
  try {
    existingReport = await reportsModels.getVoteByReportAndUser(
      reportId,
      req.currentUser.id
    );
    if (!existingReport) throw new Error("RECORD_NOT_FOUND");
    report = await reportsModels.updateVote(
      req.body.voting,
      reportId,
      req.currentUser.id
    );
    if (report === 1) res.status(200).json({ ...existingReport, ...req.body });
    else throw new Error("NO_UPDATE");
  } catch (error) {
    console.error(error);
    if ("NO_UPDATE") res.status(400).send("No new info");
    else if ("RECORD_NOT_FOUND")
      res.status(404).send(`report with id ${reportId} not found.`);
    else res.status(500).send("Error updating a vote");
  }
};

const submitVotingController = async (req, res) => {
  const { voting } = req.body;
  const { reportId } = req.params;

  try {
    const vote = await reportsModels.createVoting(
      voting,
      req.currentUser.id,
      reportId
    );

    res.status(201).send(vote);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllReportsController,
  insertNewReportController,
  getReportsInOneLocationController,
  submitVotingController,
  updateReportController,
  updateVoteController,
};
