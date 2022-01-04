const { usersModels } = require("../models");

const getUsersController = async (req, res) => {
  const users = await usersModels.getUsers();

  res.status(200).json(users);
};

const insertNewUserController = async (req, res) => {
  const { email } = req.body;
  let validationErrors = null;
  try {
    const existingUserWithEmail = await usersModels.findByEmail(email);

    if (existingUserWithEmail) throw new Error("DUPLICATE_EMAIL");
    validationErrors = usersModels.validate(req.body);
    if (validationErrors) throw new Error("INVALID_DATA");
    const createdUser = await usersModels.createUser(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    const treatedError = error.toString().slice(7);
    if (treatedError === "DUPLICATE_EMAIL")
      res.status(409).json({ message: "This email is already used" });
    else if (treatedError === "INVALID_DATA")
      res.status(422).json({ validationErrors });
    else res.status(500).send("Error saving the user");
  }
};

const findUserbyIdController = async (req, res) => {
  const userId = req.params.id;
  try {
    const results = await usersModels.findUserbyId(userId);
    if (results) res.status(200).json(results);
    else throw new Error("NO_USER");
  } catch (error) {
    console.log(error);
    if ("NO_USER") res.status(404).send("No user with the requested id");
    else res.status(500).send("Error in information retrieval");
  }
};

const updateUserController = async (req, res) => {
  const userId = req.params.id;
  let newEmail = req.body.email;

  let existingUser, validationErrors, user;
  try {
    existingUser = await usersModels.findUserbyId(userId);
    existingUserWithEmail = await usersModels.findByEmail(newEmail);
    if (!existingUser) throw new Error("RECORD_NOT_FOUND");
    if (existingUserWithEmail && existingUserWithEmail.id !== parseInt(userId))
      throw new Error("DUPLICATE_EMAIL");
    validationErrors = usersModels.validate(req.body, false);
    if (validationErrors) throw new Error("INVALID_DATA");
    user = await usersModels.updateUser(req.body, userId);
    delete req.body.password;
    if (user === 1) res.status(200).json({ ...existingUser, ...req.body });
    else throw new Error("NO_UPDATE");
  } catch (error) {
    console.error(error);
    if ("DUPLICATE_EMAIL")
      res.status(409).send("Email already in use by other user");
    else if ("INVALID_DATA") res.status(422).json({ validationErrors: error });
    else if ("NO_UPDATE") res.status(400).send("No new info");
    else if ("RECORD_NOT_FOUND")
      res.status(404).send(`User with id ${userId} not found.`);
    else res.status(500).send("Error updating a user");
  }
};

const deleteUserController = async (req, res) => {
  const targetId = req.params.id;
  const destroy = await usersModels.deleteUser(targetId);
  try {
    if (destroy.affectedRows === 1) res.status(200).send("🎉 User deleted!");
    else throw new Error("RECORD_NOT_FOUND");
  } catch (error) {
    console.log(error);
    if ("RECORD_NOT_FOUND") res.status(404).send("User not found.");
    else res.status(500).send("Error deleting an user");
  }
};

module.exports = {
  getUsersController,
  insertNewUserController,
  findUserbyIdController,
  updateUserController,
  deleteUserController,
};
