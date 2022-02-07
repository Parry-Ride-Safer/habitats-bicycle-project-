const { RecordNotFoundError } = require("../error-types");
const { authHelper } = require("../helpers");
const { usersModels } = require("../models");
const { authValidator } = require("../validators");

const login = async (credentials) => {
  try {
    const [user] = await authValidator.validateCredentialsAndGetUser(
      credentials
    );
    if (!user) throw new RecordNotFoundError();
    const token = authHelper.generateToken(user);

    delete user.hashedPassword;

    return { ...user, action: "login", token };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const register = async (user) => {
  let userCreated;

  const [users] = await usersModels.getUsers();

  if (!users)
    userCreated = await usersModels.createUser({ ...user, role: "adm" });
  else userCreated = await usersModels.createUser({ ...user, role: "user" });

  const token = authHelper.generateToken(userCreated);
  return { ...userCreated, action: "registered", token };
};

module.exports = { login, register };
