const { userHelper } = require("../helpers");

module.exports = (req, res, next) => {
  try {
    console.log(req.currentUser, "++++++++++++++++");
    if (userHelper.isAdm(req.currentUser)) return next();

    throw new Error("NOT_ALLOWED");
  } catch (error) {
    if ("NOT_ALLOWED") res.status(403).send("Not allowed");
  }
};
