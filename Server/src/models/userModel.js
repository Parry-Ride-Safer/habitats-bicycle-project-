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
  const users = await db.query("SELECT email from user");
  return users[0];
};

const createUser = async ({ password, ...body }) => {
  const hashedPassword = await hashPassword(password, saltedRounds);
  const [rawResults] = await db.query(
    "INSERT INTO user (email, hashedPassword, role)  VALUES (?, ?, ?)",
    [body.email, hashedPassword, body.role]
  );
  const id = rawResults.insertId;
  return { id, ...body };
};

const validateEmail = async (email) => {
  const [results] = await db.query("SELECT id, email FROM user WHERE email=?", [
    email,
  ]);
  return results[0];
};

const findUserbyId = async (userId) => {
  const rawResults = await db.query(
    "SELECT  id, email FROM user WHERE id = ?",
    [userId]
  );
  const [results] = rawResults;
  return results[0];
};

const findByEmail = async (email) => {
  const [results] = await db.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);
  return results[0];
};
const getUserByEmail = async (email) => {
  let [results] = await db.query(
    "SELECT id, email, hashedPassword, role FROM user WHERE email= ?;",
    [email]
  );
  return results;
};

const updateUser = async ({ password, ...data }, id) => {
  let results;

  if (password) {
    const hashedPassword = await hashPassword(password, saltedRounds);
    results = await db.query("UPDATE user SET ? WHERE id=?;", [
      { ...data, hashedPassword },
      id,
    ]);
  } else {
    results = await db.query("UPDATE user SET ? WHERE id=?;", [
      { ...data },
      id,
    ]);
  }
  console.log(results);
  return results[0].affectedRows;
};

const deleteUser = async (id) => {
  let [results] = await db.query("DELETE FROM user WHERE id = ?", [id]);
  return results;
};

const reportsFromUserId = async (id) => {
  let [results] = await db.query(
    "SELECT address_id, createdAt, category_id, report.id, information, avg(voting) AS voting  from report join voting on voting.report_id = report.id WHERE report.user_id = ? group by address_id",
    [id]
  );
  return results;
};

const ratedFromUserId = async (id) => {
  const [ratedSpots] = await db.query(
    "SELECT address_id FROM report join voting on voting.report_id = report.id WHERE voting.user_id = ?",
    [id]
  );
  return ratedSpots;
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
  ratedFromUserId,
};
