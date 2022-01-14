const { authHelper } = require("../helpers");
const { userValidator } = require("../validators");

module.exports = (req, _res, next) => {
  if (!req.cookies?.login) throw new Error("INVALID_TOKEN");

  try {
    req.currentUser = authHelper.decodeToken(req.cookies.login);

    next();
  } catch (error) {
    if (error.message === "INVALID_TOKEN")
      return res.status(404).send("not allowed");
    next(error);
  }
};
