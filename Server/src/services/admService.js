const { admModels } = require("../models");
const { userValidator } = require("../validators");

const findAll = async (currentUser, userId) => {
  await userValidator.validatePermission(currentUser, userId);
  return await admModels.getUsers();
};

module.exports = { findAll };
