const connection = require("../../db-config");
const db = connection.promise();

const getUserByEmail = async (email) => {
  try {
    let [results] = await db.query(
      "SELECT id, hashedPassword FROM users WHERE email= ?;",
      [email]
    );
    return results;
  } catch (error) {
    console.log(err);
    return err;
  }
};

module.exports = {
  getUserByEmail,
};
