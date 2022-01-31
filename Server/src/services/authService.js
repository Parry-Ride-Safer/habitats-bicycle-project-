const { authHelper } = require("../helpers");
const { usersModels } = require("../models");
const { authValidator } = require("../validators");

const login = async (credentials) => {
  try {
    const [user] = await authValidator.validateCredentialsAndGetUser(
      credentials
    );
    console.log(user);
    if (!user) throw new Error("NO_RECORD_FOUND");
    const token = authHelper.generateToken(user);

    delete user.hashedPassword;

    return { ...user, action: "login", token };
  } catch (error) {
    console.log(error);
    if ("NO_RECORD_FOUND") res.status(404).send("User not found.");
    else res.status(500).send("Error finding user");
  }
};

const register = async (user) => {
  const userCreated = await usersModels.createUser({ ...user, role: "user" });

  const token = authHelper.generateToken(userCreated);
  return { ...userCreated, action: "registered", token };
};

module.exports = { login, register };
