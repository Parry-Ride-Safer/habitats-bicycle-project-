const connection = require("../../db-config");

const db = connection.promise();

const getAllReports = async () => {
  const reports = await db.query("SELECT * FROM reports");
  return reports[0];
};

const getReportsInOneLocation = async (locationId) => {
  const reports = await db.query(
    "SELECT information, voting, category_id  FROM reports WHERE address_id = ?",
    [locationId]
  );
  const results = reports;
  return results[0];
};

const createReport = async ({
  information,
  voting,
  address_id,
  users_id,
  category_id,
}) => {
  const rawresults = await db.query(
    "INSERT INTO reports (information, voting, address_id, users_id, category_id) VALUES (?, ?, ?, ?, ?)",
    [information, voting, address_id, users_id, category_id]
  );
  const id = rawresults.insertId;

  return {
    id,
    information,
    voting,
    address_id,
    users_id,
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
};
