const { RecordNotFoundError } = require("../error-types");
const { admModels } = require("../models");
const { admService } = require("../services");

const getUsersController = async (req, res, next) => {
  try {
    const users = await admService.findAll(req.currentUser, req.currentUser.id);
    if (!users) throw new RecordNotFoundError("No users");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllHiddenLocationsController = async (req, res, next) => {
  try {
    const locations = await admModels.getAllHiddenLocations();
    if (!locations) throw RecordNotFoundError;
    res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsersController,
  getAllHiddenLocationsController,
};
