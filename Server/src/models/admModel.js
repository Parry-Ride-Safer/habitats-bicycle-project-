const connection = require("../../db-config");

const db = connection.promise();

const getUsers = async () => {
  const users = await db.query("SELECT email, role from user");
  return users[0];
};

module.exports = { getUsers };
