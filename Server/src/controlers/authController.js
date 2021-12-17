const { authModels } = require("../models");
const { userHelper } = require("../helpers");

const userAuthenticationController = (req, res) => {
  const { email, password } = req.body;
  let id;

  if (email && password) {
    authModels
      .getUserByEmail(email)
      .then(([users]) => {
        if (!users) return Promise.reject("NO_MATCH");
        return userHelper.verifyPassword(password, users.hashedPassword);
      })
      .then((passwordIsCorrect) => {
        if (!passwordIsCorrect) return Promise.reject("NO_MATCH");
        res.send("Logged in");
      })
      .catch((err) => {
        console.log(err);
        if (err === "NO_MATCH") res.status(401).send("Invalid credentials!");
        else res.status(500).send("Server issues");
      });
  } else {
    res.status(401).send("Invalid credentials!");
  }
};

module.exports = { userAuthenticationController };
