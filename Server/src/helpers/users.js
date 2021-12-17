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

const verifyPassword = async (email, password) => {
  let match;
  try {
    const [results] = await db.query(
      "SELECT id, hashedPassword FROM users WHERE email=?",
      [email]
    );
    if (!results[0]) throw new Error("INVALID_EMAIL");
    const { hashPassword } = results[0];
    match = await bcrypt.compare(password, hashPassword);
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
