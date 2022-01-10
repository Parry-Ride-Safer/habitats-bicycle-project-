const { authHelper } = require("../helpers");
const { usersModels } = require("../models");
const { authValidator } = require("../validators");

const login = async (credentials) => {
  const [user] = await authValidator.validateCredentialsAndGetUser(credentials);

  const token = authHelper.generateToken(user);

  delete user.hashedPassword;

  return { ...user, action: "login", token };
};

const register = async (user) => {
  const userCreated = await usersModels.createUser({ ...user, role: "user" });

  const token = authHelper.generateToken(userCreated);
  return { ...userCreated, action: "registered", token };
};

module.exports = { login, register };
