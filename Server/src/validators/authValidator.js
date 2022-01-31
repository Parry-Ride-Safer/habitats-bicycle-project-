const { usersModels } = require("../models");
const { userHelper } = require("../helpers");
const { userValidator } = require(".");
const { RecordNotFoundError } = require("../error-types");

const validateCredentialsAndGetUser = async (credentials) => {
  userValidator.validate(credentials, ["email", "hashedPassword", "role"]);
  try {
    const userFound = await usersModels.getUserByEmail(credentials.email);
    console.log(userFound);
    if (userFound.length === 0)
      throw new RecordNotFoundError("Invalid credentials");
    const isValidPassword = await userHelper.verifyPassword(
      credentials.password,
      userFound[0].hashedPassword
    );

    if (!isValidPassword) throw new Error("INVALID_DATA");

    return userFound;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { validateCredentialsAndGetUser };
