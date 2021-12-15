const { usersModels } = require("../models");

function getUsersController(req, res) {
  const users = usersModels.getUsers();
  users.then((user) => {
    res.status(200).json(user);
  });
}

module.exports = {
  getUsersController,
};
