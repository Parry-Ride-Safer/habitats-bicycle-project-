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
  const users = await db.query("SELECT email from users");
  return users[0];
};

const createUser = async ({ password, ...body }) => {
  const hashedPassword = await hashPassword(password, saltedRounds);
  const [rawResults] = await db.query(
    "INSERT INTO users (email, hashedPassword)  VALUES (?, ?)",
    [body.email, hashedPassword]
  );
  const id = rawResults.insertId;
  return { id, ...body };
};

const validateEmail = async (email) => {
  const [results] = await db.query(
    "SELECT id, email FROM users WHERE email=?",
    [email]
  );
  return results[0];
};

const findUserbyId = async (userId) => {
  const rawResults = await db.query("SELECT  email FROM users WHERE id = ?", [
    userId,
  ]);
  const [results] = rawResults;
  return results[0];
};

const findByEmail = async (email) => {
  const [results] = await db.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return results[0];
};
const getUserByEmail = async (email) => {
  let [results] = await db.query(
    "SELECT id, email, hashedPassword, role FROM users WHERE email= ?;",
    [email]
  );
  return results;
};

const updateUser = async ({ password, ...data }, id) => {
  let results;

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
};

const deleteUser = async (id) => {
  let [results] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return results;
};

const reportsFromUserId = async (id) => {
  try {
    let [results] = await db.query("SELECT * from reports WHERE users_id = ?", [
      id,
    ]);
    return results;
  } catch (error) {
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
  reportsFromUserId,
};
