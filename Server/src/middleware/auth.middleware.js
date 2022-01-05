const { authHelper } = require("../helpers");

module.exports = (req, _res, next) => {
  if (!req.cookies?.login) throw new Error("INVALID_TOKEN");

  try {
    req.currentUser = authHelper.decodeToken(req.cookies.login);

    next();
  } catch (error) {
    if ("INVALID_TOKEN") res.status(404).send("not allowed");
    next();
  }
};
