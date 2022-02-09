const { usersModels } = require("../models");
const { userHelper } = require("../helpers");
const { userValidator } = require(".");
const {
  RecordNotFoundError,
  InvalidCredentialsError,
} = require("../error-types");

const validateCredentialsAndGetUser = async (credentials) => {
  userValidator.validate(credentials, ["email", "hashedPassword", "role"]);

  const userFound = await usersModels.getUserByEmail(credentials.email);
  if (userFound.length === 0) throw new RecordNotFoundError("Invalid email");
  const isValidPassword = await userHelper.verifyPassword(
    credentials.password,
    userFound[0].hashedPassword
  );

  if (!isValidPassword) throw new InvalidCredentialsError("Invalid password");

  return userFound;
};

module.exports = { validateCredentialsAndGetUser };
