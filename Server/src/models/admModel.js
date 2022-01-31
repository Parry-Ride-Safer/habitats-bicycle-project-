const connection = require("../../db-config");

const db = connection.promise();

const getUsers = async () => {
  const users = await db.query("SELECT email, role from user");
  return users[0];
};

const getAllHiddenLocations = async () => {
  const [locations] = await db.query(
    "SELECT address.id, lat, lng, avg(voting) from address join report on report.address_id= address.id join voting on voting.report_id = report.id WHERE is_hidden = true group by address.id, lat, lng order by address.id asc "
  );
  return locations[0];
};

module.exports = { getUsers, getAllHiddenLocations };
