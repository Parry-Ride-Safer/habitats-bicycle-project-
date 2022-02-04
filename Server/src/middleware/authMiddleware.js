const { authHelper } = require("../helpers");

module.exports = (req, res, next) => {
  if (!req.cookies?.login) throw new Error("INVALID_TOKEN");

  try {
    req.currentUser = authHelper.decodeToken(req.cookies.login);

    next();
  } catch (error) {
    if (error.message === "INVALID_TOKEN")
      return res.status(401).send("Invalid Token");
    next(error);
  }
};
