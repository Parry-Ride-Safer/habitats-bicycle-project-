const { reportsModels } = require("../models");
const { InvalidDataError, RecordNotFoundError } = require("../error-types");
const { authHelper } = require("../helpers");

const getAllReportsController = async (req, res) => {
  try {
    const reports = await reportsModels.getAllReports();
    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
  }
};

const getReportsInOneLocationController = async (req, res, next) => {
  const locationId = parseInt(req.params.id);
  let userVoteFound;
  let currentUser;
  try {
    const [reportFound] = await reportsModels.getReportsInOneLocation(
      locationId
    );
    if (!reportFound)
      throw new RecordNotFoundError("No Location with the requested id");
    if (req.cookies?.login)
      currentUser = authHelper.decodeToken(req.cookies.login);

    if (currentUser) {
      userVoteFound = await reportsModels.getVoteByReportAndUser(
        reportFound.id,
        currentUser.id
      );
    }

    res.status(200).json([reportFound, userVoteFound]);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const insertNewReportController = async (req, res, next) => {
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
      user_id: req.currentUser.id,
      address_id,
    });
    if (!createdReport) throw new InvalidDataError("Missing data");
    res.status(201).json(createdReport);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateReportController = async (req, res, next) => {
  const reportId = req.params.id;
  let existingReport, report;
  try {
    existingReport = await reportsModels.getReportById(reportId);
    if (!existingReport)
      throw new RecordNotFoundError(`report with id ${reportId} not found.`);
    report = await reportsModels.updateReport(req.body, reportId);

    if (report === 2) res.status(200).json({ ...existingReport, ...req.body });
    else throw new InvalidDataError("Nothing to be changed");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateVoteController = async (req, res, next) => {
  const { reportId } = req.params;
  let existingReport, report;
  try {
    existingReport = await reportsModels.getVoteByReportAndUser(
      reportId,
      req.currentUser.id
    );
    if (!existingReport)
      throw new RecordNotFoundError(`report with id ${reportId} not found.`);
    report = await reportsModels.updateVote(
      req.body.voting,
      reportId,
      req.currentUser.id
    );
    if (report === 1) res.status(200).json({ ...existingReport, ...req.body });
    else throw new InvalidDataError("Nothing to be changed");
  } catch (error) {
    console.error(error);
    next(error);
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
const submitFlagController = async (req, res) => {
  const { flag } = req.body;
  const { reportId } = req.params;

  try {
    const flags = await reportsModels.createFlag(
      flag,
      req.currentUser.id,
      reportId
    );
    const [results] = await reportsModels.moderateReports(reportId);
    console.log(results);
    if (results[0].result < 0) await reportsModels.isVisable(reportId);

    res.status(201).send(flags);
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
  submitFlagController,
};
