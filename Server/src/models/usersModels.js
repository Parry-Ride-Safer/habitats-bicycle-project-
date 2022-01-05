const connection = require("../../db-config");
const { hashPassword } = require("../helpers/usersHelper");
const saltedRounds = parseInt(process.env.SALT_ROUNDS);

const db = connection.promise();

connection.connect((error) => {
  if (error) {
    console.error("error connecting: " + error.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

const getUsers = async () => {
  try {
    const users = await db.query("SELECT email from users");
    return users[0];
  } catch (error) {
    console.log(error);
  }
};

const createUser = async ({ password, ...body }) => {
  try {
    const hashedPassword = await hashPassword(password, saltedRounds);
    const [rawResults] = await db.query(
      "INSERT INTO users (email, hashedPassword)  VALUES (?, ?)",
      [body.email, hashedPassword]
    );
    const id = rawResults.insertId;
    return { id, ...body };
  } catch (error) {
    console.log(error);
  }
};

const validateEmail = async (email) => {
  try {
    const [results] = await db.query(
      "SELECT id, email FROM users WHERE email=?",
      [email]
    );
    return results[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findUserbyId = async (userId) => {
  try {
    const rawResults = await db.query("SELECT  email FROM users WHERE id = ?", [
      userId,
    ]);
    const [results] = rawResults;
    return results[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findByEmail = async (email) => {
  try {
    const [results] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return results[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getUserByEmail = async (email) => {
  try {
    let [results] = await db.query(
      "SELECT id, hashedPassword, role FROM users WHERE email= ?;",
      [email]
    );
    return results;
  } catch (error) {
    console.log(err);
    return err;
  }
};

const updateUser = async ({ password, ...data }, id) => {
  let results;
  try {
    if (password) {
      const hashedPassword = await hashPassword(password, saltedRounds);
      results = await db.query("UPDATE users SET ? WHERE id=?;", [
        { ...data, hashedPassword },
        id,
      ]);
    } else {
      results = await db.query("UPDATE users SET ? WHERE id=?;", [
        { ...data },
        id,
      ]);
    }
    return results[0].affectedRows;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteUser = async (id) => {
  try {
    let [results] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return results;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getUsers,
  createUser,
  validateEmail,
  findByEmail,
  updateUser,
  deleteUser,
  findUserbyId,
  getUserByEmail,
};
