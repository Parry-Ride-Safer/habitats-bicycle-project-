const connection = require("../../db-config");

const db = connection.promise();

const getAllReports = async () => {
  try {
    const reports = await db.query("SELECT * FROM reports");
    return reports[0];
  } catch (error) {
    console.log(error);
  }
};

const getReportsInOneLocation = async (locationId) => {
  try {
    const reports = await db.query(
      "SELECT information, voting, category_id  FROM reports WHERE address_id = ?",
      [locationId]
    );
    const results = reports;
    return results[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createReport = async ({
  information,
  title,
  voting,
  address_id,
  users_id,
  category_id,
}) => {
  try {
    const rawresults = await db.query(
      "INSERT INTO reports (information, title, voting, address_id, users_id, category_id) VALUES (?, ?, ?, ?, ?, ?)",
      [information, title, voting, address_id, users_id, category_id]
    );
    const id = rawresults.insertId;

    return {
      id,
      information,
      title,
      voting,
      address_id,
      users_id,
      category_id,
    };
  } catch (error) {
    console.log(error);
  }
};

const findLocation = async (lat, lng) => {
  try {
    const [location] = await db.query(
      "SELECT id FROM address WHERE lat = ? AND lng = ? ",
      [lat, lng]
    );
    return location[0];
  } catch (error) {
    console.log(error);
  }
};

const createLocation = async (lat, lng) => {
  try {
    const [location] = await db.query(
      "INSERT INTO address (lat, lng) VALUES ( ?, ?)",
      [lat, lng]
    );
    const id = location.insertId;
    return { id, lat, lng };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllReports,
  createReport,
  findLocation,
  getReportsInOneLocation,
  createLocation,
};
