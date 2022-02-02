const { usersModels, reportsModels } = require("../models");
const { userValidator } = require("../validators");
const {
  RecordNotFoundError,
  AlreadyExistsError,
  InvalidDataError,
  ValidationError,
} = require("../error-types");

const getUsersController = async (req, res) => {
  const users = await usersModels.getUsers();

  res.status(200).json(users);
};

const insertNewUserController = async (req, res, next) => {
  const { email } = req.body;
  let validationErrors = null;
  try {
    const existingUserWithEmail = await usersModels.findByEmail(email);

    if (existingUserWithEmail)
      throw new AlreadyExistsError("This email is already used");
    validationErrors = userValidator.validate(req.body);
    if (validationErrors) throw new InvalidDataError("Missing data");
    const createdUser = await usersModels.createUser(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

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
    ///// need error
    const reports = await usersModels.reportsFromUserId(req.currentUser.id);
    if (reports.length < 1) throw new RecordNotFoundError("Reports not found");
    res.status(200).send(reports);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ratedSpotsFromUserIdController = async (req, res, next) => {
  try {
    ///// need error handling
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

module.exports = {
  getUsersController,
  insertNewUserController,
  getUserbyIdController,
  updateUserController,
  deleteUserController,
  reportsFromUserIdController,
  ratedSpotsFromUserIdController,
};
