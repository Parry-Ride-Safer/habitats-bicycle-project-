const { admService } = require("../services");

const getUsersController = async (req, res) => {
  try {
    console.log(req.currentUser, "+++++++++++++++");
    const users = await admService.findAll(req.currentUser, req.currentUser.id);

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsersController,
};
