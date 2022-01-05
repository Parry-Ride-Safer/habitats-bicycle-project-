const { locationModels } = require("../models");

const getAllLocationsController = async (req, res) => {
  try {
    const locations = await locationModels.getAllLocations();
    res.status(200).json(locations);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllLocationsController };
