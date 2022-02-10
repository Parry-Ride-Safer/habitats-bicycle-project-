const { usersModels, reportsModels } = require("../models");
const { userValidator } = require("../validators");
const {
  RecordNotFoundError,
  AlreadyExistsError,
  InvalidDataError,
  ValidationError,
} = require("../error-types");

const getUserbyIdController = async (req, res) => {
  try {
    const results = await usersModels.getUserbyId(req.currentUser.id);
    if (results) res.status(200).json(results);
    else throw new RecordNotFoundError("User not found");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  let newEmail = req.body.email;

  let existingUser, validationErrors, user;
  try {
    existingUser = await usersModels.getUserbyId(req.currentUser.id);
    existingUserWithEmail = await usersModels.findByEmail(newEmail);
    if (!existingUser) throw new RecordNotFoundError("User not found");
    if (
      existingUserWithEmail &&
      existingUserWithEmail.id !== parseInt(req.currentUser.id)
    )
      throw new AlreadyExistsError("Email already exists");
    validationErrors = userValidator.validate(req.body, false);
    if (validationErrors) throw new ValidationError("Validation error");
    user = await usersModels.updateUser(req.body, req.currentUser.id);
    delete req.body.password;
    delete req.body.role;
    if (user === 1) res.status(200).json({ ...existingUser, ...req.body });
    else throw new InvalidDataError("Nothing to be changed");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteUserController = async (req, res) => {
  const targetId = req.params.id;
  const destroy = await usersModels.deleteUser(targetId);
  try {
    if (destroy.affectedRows === 1) res.status(200).send("🎉 User deleted!");
    else throw new RecordNotFoundError("User not found");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const reportsFromUserIdController = async (req, res, next) => {
  try {
    const reports = await usersModels.reportsFromUserId(req.currentUser.id);
    if (reports.length < 0) throw new RecordNotFoundError("Reports not found");
    res.status(200).send(reports);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ratedSpotsFromUserIdController = async (req, res, next) => {
  try {
    const ratedSpots = await usersModels.ratedFromUserId(req.currentUser.id);
    const selectionIdString = ratedSpots.map((elt) => elt.address_id);
    const reports = await reportsModels.getReportsInOneLocation(
      selectionIdString
    );
    if (reports.length < 1) throw new RecordNotFoundError("Reports not found.");
    res.status(200).send(reports);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ratedSpotsFromUserController = async (req, res, next) => {
  try {
    const ratedSpots = await usersModels.ratedSpotsFromUserId(
      req.currentUser.id
    );
    if (ratedSpots.length < 1)
      throw new RecordNotFoundError("Reports not found.");
    res.status(200).send(ratedSpots);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserbyIdController,
  updateUserController,
  deleteUserController,
  reportsFromUserIdController,
  ratedSpotsFromUserIdController,
  ratedSpotsFromUserController,
};
