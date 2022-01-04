const { authModels } = require("../models");
const { userHelper } = require("../helpers");

const userAuthenticationController = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const users = await authModels.getUserByEmail(email);
      if (!users) throw new Error("NO_MATCH");
      const passwordIsCorrect = await userHelper.verifyPassword(
        password,
        users[0].hashedPassword
      );
      if (!passwordIsCorrect) throw new Error("NO_MATCH");
      res.send("Logged in");
    } catch (error) {
      console.log(error);
      if ("NO_MATCH") res.status(401).send("Invalid credentials!");
      else res.status(500).send("Server issues");
    }
  } else {
    res.status(401).send("Invalid credentials!");
  }
};

// if (email && password) {
//   authModels
//     .getUserByEmail(email)
//     .then(([users]) => {
//       if (!users) return Promise.reject("NO_MATCH");
//       return userHelper.verifyPassword(password, users.hashedPassword);
//     })
//     .then((passwordIsCorrect) => {
//       if (!passwordIsCorrect) return Promise.reject("NO_MATCH");
//       res.send("Logged in");
//     })
//     .catch((err) => {
//       console.log(err);
//       if (err === "NO_MATCH") res.status(401).send("Invalid credentials!");
//       else res.status(500).send("Server issues");
//     });
// } else {
//   res.status(401).send("Invalid credentials!");
// }
module.exports = { userAuthenticationController };