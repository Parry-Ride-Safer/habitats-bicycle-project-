const { admModels } = require("../models");
const { admService } = require("../services");

const getUsersController = async (req, res) => {
  try {
    const users = await admService.findAll(req.currentUser, req.currentUser.id);
    if (!users) throw new Error("NO_RECORD_FOUND");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    if ("NO_RECORD_FOUND") res.status(404).send("No users");
  }
};

const getAllHiddenLocationsController = async (req, res) => {
  try {
    const locations = await admModels.getAllHiddenLocations();
    if (!locations) throw new Error("NO_DATA");
    res.status(200).json(locations);
  } catch (error) {
    console.log(error);
    if ("NO_DATA") res.status(404).send("No locations Saved");
    else res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getUsersController,
  getAllHiddenLocationsController,
};
