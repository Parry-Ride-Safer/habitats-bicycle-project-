const { authService } = require("../services/index.js");
const { usersModels } = require("../models");
const { userValidator } = require("../validators/index.js");

const cookiesOptions = { httpOnly: true, sameSite: "lax" };

const register = async (req, res) => {
  const { email } = req.body;
  let validationErrors = null;

  try {
    const existingUserWithEmail = await usersModels.findByEmail(email);

    if (existingUserWithEmail) throw new Error("DUPLICATE_EMAIL");
    validationErrors = userValidator.validate(req.body);
    if (validationErrors) throw new Error("INVALID_DATA");
    const { token, ...user } = await authService.register(req.body);

    res
      .cookie("login", token, cookiesOptions)
      .cookie("LoggedIn", true)
      .json({ message: "Welcome to the rider family!" });
  } catch (error) {
    console.error(error);
    const treatedError = error.toString().slice(7);
    if (treatedError === "DUPLICATE_EMAIL")
      res.status(409).json({ message: "This email is already used" });
    else if (treatedError === "INVALID_DATA")
      res.status(422).json({ validationErrors });
    else res.status(500).send("Error saving the user");
  }
};

const login = async (req, res) => {
  try {
    const { token, ...user } = await authService.login(req.body);
    res
      .cookie("login", token, cookiesOptions)
      .cookie("LoggedIn", true)
      .json({ message: "Welcome Back Rider" });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (_req, res) => {
  try {
    res
      .clearCookie("login")
      .clearCookie("LoggedIn")
      .json({ message: "logout" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, logout };
