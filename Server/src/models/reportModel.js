const connection = require("../../db-config");

const db = connection.promise();

const getAllReports = async () => {
  const reports = await db.query("SELECT * FROM report");
  return reports[0];
};

const getReportsInOneLocation = async (locationId) => {
  const reports = await db.query(
    "SELECT report.id, information, avg(voting) AS voting, category_id  FROM report join voting on voting.report_id = report.id WHERE address_id = ?  ",
    [locationId]
  );
  const results = reports;
  return results[0];
};

const createVoting = async (voting, user_id, id) => {
  await db.query(
    "INSERT INTO voting ( voting, user_id, report_id) VALUES (?, ?, ?)",
    [voting, user_id, id]
  );
  return { voting, user_id, id };
};

const createReport = async ({
  information,
  voting,
  address_id,
  user_id,
  category_id,
}) => {
  const [createdReport] = await db.query(
    "INSERT INTO report (information, address_id, user_id, category_id) VALUES (?, ?, ?, ?)",
    [information, address_id, user_id, category_id]
  );
  const id = createdReport.insertId;

  await createVoting(voting, user_id, id);

  return {
    id,
    information,
    voting,
    address_id,
    user_id,
    category_id,
  };
};

const findLocation = async (lat, lng) => {
  const [location] = await db.query(
    "SELECT id FROM address WHERE lat = ? AND lng = ? ",
    [lat, lng]
  );
  return location[0];
};

const createLocation = async (lat, lng) => {
  const [location] = await db.query(
    "INSERT INTO address (lat, lng) VALUES ( ?, ?)",
    [lat, lng]
  );
  const id = location.insertId;
  return { id, lat, lng };
};

module.exports = {
  getAllReports,
  createReport,
  findLocation,
  getReportsInOneLocation,
  createLocation,
  createVoting,
};
