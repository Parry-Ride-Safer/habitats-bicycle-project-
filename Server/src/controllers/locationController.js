const { locationModels } = require("../models");

const getAllLocationsController = async (req, res) => {
  try {
    const locations = await locationModels.getAllLocations();
    if (!locations) throw new Error("NO_DATA");
    res.status(200).json(locations);
  } catch (error) {
    console.log(error);
    if ("NO_DATA") res.status(404).send("No locations Saved");
    else res.status(500).send("Internal Server Error");
  }
};

module.exports = { getAllLocationsController };
