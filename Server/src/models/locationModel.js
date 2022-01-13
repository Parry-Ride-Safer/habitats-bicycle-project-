const connection = require("../../db-config");

const db = connection.promise();

const getAllLocations = async () => {
  const locations = await db.query(
    "SELECT address.id, lat, lng, avg(voting) from address join report on report.address_id= address.id join voting on voting.report_id = report.id group by address.id, lat, lng order by address.id asc "
  );

  return locations[0];
};

module.exports = {
  getAllLocations,
};
