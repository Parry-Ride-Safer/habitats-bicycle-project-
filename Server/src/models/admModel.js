const connection = require("../../db-config");

const db = connection.promise();

const getUsers = async () => {
  const users = await db.query("SELECT id ,email, role from user");
  return users[0];
};

const getAllHiddenLocations = async () => {
  const [locations] = await db.query(
    "SELECT report.id, information, avg(voting) AS voting, category.name, createdAt, report.user_id, image, count(voting) as count, count(flag_id) as flags FROM report join rating on rating.report_id = report.id join category on report.category_id = category.id  group by address_id"
  );
  return locations;
};

const deleteReport = async (id) => {
  let [results] = await db.query("DELETE FROM report WHERE report.id = ?", [
    id,
  ]);
  return results;
};

const updateRole = async (id) => {
  let update = await db.query(" UPDATE USER SET role = 'adm' where id = ?", [
    id,
  ]);

  return update[0].affectedRows;
};

module.exports = { getUsers, getAllHiddenLocations, deleteReport, updateRole };
