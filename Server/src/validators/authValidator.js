const { usersModels } = require("../models");
const { userHelper } = require("../helpers");
const { userValidator } = require(".");

const validateCredentialsAndGetUser = async (credentials) => {
  userValidator.validate(credentials, ["email", "hashedPassword", "role"]);
  try {
    const userFound = await usersModels.getUserByEmail(credentials.email);

    if (!userFound) throw new Error("INVALID_DATA");
    const isValidPassword = await userHelper.verifyPassword(
      credentials.password,
      userFound[0].hashedPassword
    );

    if (!isValidPassword) throw new Error("INVALID_DATA");

    return userFound;
  } catch (error) {
    console.log(error);
    if ("INVALID_DATA") res.status(422).send("invalid data");
  }
};

module.exports = { validateCredentialsAndGetUser };

// const validateCredentialsAndGetUser = async (req, res) => {
//     const { email, password } = req.body;

//     if (email && password) {
//       try {
//         const users = await authModels.getUserByEmail(email);
//         if (!users) throw new Error("NO_MATCH");
//         const passwordIsCorrect = await userHelper.verifyPassword(
//           password,
//           users[0].hashedPassword
//         );
//         if (!passwordIsCorrect) throw new Error("NO_MATCH");
//         res.send("Logged in");
//       } catch (error) {
//         console.log(error);
//         if ("NO_MATCH") res.status(401).send("Invalid credentials!");
//         else res.status(500).send("Server issues");
//       }
//     } else {
//       res.status(401).send("Invalid credentials!");
//     }
//   };
