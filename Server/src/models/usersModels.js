const connection = require("../../db-config");

const db = connection.promise();

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

const getUsers = () => {
  return db.query("SELECT * from users").then(([results]) => results);
};

module.exports = { getUsers };
