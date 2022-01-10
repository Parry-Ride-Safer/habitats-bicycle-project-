const connection = require("../../db-config");

const db = connection.promise();

exports.getAllLocations = async () => {
  const locations = await db.query("SELECT * FROM address");
  return locations[0];
};
