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
    if (results.length) res.status(200).json(results);
    else throw new Error("NO_LOCATION");
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
    res.status(201).json(createdReport);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving Location");
  }
};

module.exports = {
  getAllReportsController,
  insertNewReportController,
  getReportsInOneLocationController,
};
