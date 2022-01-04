const bcrypt = require("bcrypt");
const connection = require("../../db-config");
const db = connection.promise();

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
    console.log(match);
    if (!match) return false;
    return match;
  } catch (error) {
    console.log(error);
    let treatedError = error.toString().slice(7);
    console.log(treatedError);
  }
};

module.exports = { hashPassword, verifyPassword };
