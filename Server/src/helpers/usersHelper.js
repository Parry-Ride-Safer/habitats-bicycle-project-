const bcrypt = require("bcrypt");

const hashPassword = async (password, saltRounds) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const verifyPassword = async (password, hash) => {
  let match;
  try {
    match = await bcrypt.compare(password, hash);
    if (!match) return false;
    return match;
  } catch (error) {
    console.log(error);
    error.toString().slice(7);
  }
};

const isAdm = ({ role }) => role === "adm";

const isCurrentUser = ({ id }, userId) => id === userId;

module.exports = { hashPassword, verifyPassword, isAdm, isCurrentUser };
