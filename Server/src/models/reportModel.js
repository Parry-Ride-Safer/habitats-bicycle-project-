const connection = require("../../db-config");

const db = connection.promise();

const getAllReports = async () => {
  const reports = await db.query("SELECT * FROM report");
  return reports[0];
};

const getReportsInOneLocation = async (locationId) => {
  const reports = await db.query(
    "SELECT report.id, information, avg(voting) AS voting, category.name, createdAt, report.user_id  FROM report join voting on voting.report_id = report.id join category on report.category_id = category.id WHERE address_id in (?) group by address_id",
    [locationId]
  );
  const results = reports;
  return results[0];
};

const createVoting = async (voting, userId, reportId) => {
  await db.query(
    "INSERT INTO voting ( voting, user_id, report_id) VALUES (?, ?, ?)",
    [voting, userId, reportId]
  );
  return { voting, userId, reportId };
};
/* DELETE is_hidden*/
const createReport = async ({
  information,
  voting,
  address_id,
  user_id,
  image,
  category_id,
}) => {
  const [createdReport] = await db.query(
    "INSERT INTO report (information, address_id, user_id, image, category_id) VALUES (?, ?, ?, ?, ?)",
    [information, address_id, user_id, image, category_id]
  )
  const id = createdReport.insertId;

  await createVoting(voting, user_id, id);

  return {
    id,
    information,
    voting,
    address_id,
    user_id,
    image,
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
const updateReport = async ({ ...data }, id) => {
  const results = await db.query(
    "UPDATE report join voting on voting.report_id= report.id SET ?  WHERE report.id=? ",
    [{ ...data }, id]
  );

  return results[0].affectedRows;
};

const getReportById = async (id) => {
  const [findReport] = await db.query("SELECT * FROM report WHERE id in (?)", [
    id,
  ]);
  return findReport;
};
const getVoteByReportAndUser = async (reportId, userId) => {
  const [findReport] = await db.query(
    "SELECT * FROM voting WHERE report_id = ? AND user_id = ?",
    [reportId, userId]
  );
  return findReport;
};

const updateVote = async (voting, reportId, userId) => {
  const results = await db.query(
    "UPDATE voting SET voting = ? WHERE report_id = ? AND user_id = ? ",
    [voting, reportId, userId]
  );
  console.log(results[0].affectedRows);
  return results[0].affectedRows;
};

const createFlag = async (flag, userId, reportId) => {
  await db.query(
    "INSERT INTO voting ( flag_id, user_id, report_id) VALUES (?, ?, ?)",
    [flag, userId, reportId]
  );
  return { flag, userId, reportId };
};

const moderateReports = async (id) => {
  const results = await db.query(
    "SELECT COUNT(voting)-COUNT(flag_id) as result from voting WHERE report_id = ?",
    id
  );
  return results;
};
const isVisable = async (id) => {
  await db.query("UPDATE report SET is_hidden = 1 where id = ?", id);
};

module.exports = {
  getAllReports,
  createReport,
  findLocation,
  getReportsInOneLocation,
  createLocation,
  createVoting,
  updateReport,
  getReportById,
  updateVote,
  getVoteByReportAndUser,
  createFlag,
  moderateReports,
  isVisable,
};
