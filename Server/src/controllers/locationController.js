const { locationModels } = require("../models");
const { RecordNotFoundError } = require("../error-types");

const getAllLocationsController = async (_req, res, next) => {
  try {
    const locations = await locationModels.getAllLocations();
    if (locations.length === 0) throw new RecordNotFoundError("No locations Saved");
    res.status(200).json(locations);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getAllLocationsController };
