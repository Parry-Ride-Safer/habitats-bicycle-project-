const connection = require("../../db-config");
const Joi = require("joi");
const { hashPassword } = require("../helpers/users");
const saltedRounds = parseInt(process.env.SALT_ROUNDS);

const db = connection.promise();

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    firstname: Joi.string().max(255).presence(presence),
    lastname: Joi.string().max(255).presence(presence),
    email: Joi.string().email().max(255).presence(presence),
    password: Joi.string().alphanum().min(8).max(50).presence(presence),
    username: Joi.string().max(255).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

connection.connect((error) => {
  if (error) {
    console.error("error connecting: " + error.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

const getUsers = async () => {
  try {
    const users = await db.query(
      "SELECT firstname, lastname, username, email from users"
    );
    return users[0];
  } catch (error) {
    console.log(error);
  }
};

const createUser = async ({ password, ...body }) => {
  try {
    const hashedPassword = await hashPassword(password, saltedRounds);
    const rawResults = await db.query("INSERT INTO users SET ?", {
      hashedPassword,
      ...body,
    });
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
    const rawResults = await db.query(
      "SELECT firstname, lastname, email, username FROM users WHERE id = ?",
      [userId]
    );
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
  validate,
  updateUser,
  deleteUser,
  findUserbyId,
};
