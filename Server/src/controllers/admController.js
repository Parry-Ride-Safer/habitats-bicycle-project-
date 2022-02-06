const { RecordNotFoundError, InvalidDataError } = require("../error-types");
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

const getAllHiddenLocationsController = async (_req, res, next) => {
  try {
    const locations = await admModels.getAllHiddenLocations();
    if (!locations) throw RecordNotFoundError("No location Found");
    res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

const deleteReportController = async (req, res, next) => {
  const targetId = req.params.id;
  const destroy = await admModels.deleteReport(targetId);
  try {
    if (destroy.affectedRows === 1) res.status(200).send("🎉 Report deleted!");
    else throw new RecordNotFoundError("Report not found");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateRoleController = async (req, res, next) => {
  const targetId = req.params.id;
  try {
    const updateUser = await admModels.updateRole(targetId);
    if (updateUser === 1) res.status(200).send("Updated to Admin");
    else throw new InvalidDataError("Nothing to be changed");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsersController,
  getAllHiddenLocationsController,
  deleteReportController,
  updateRoleController,
};
