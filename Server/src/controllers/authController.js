const { authService } = require("../services/index.js");

const cookiesOptions = { httpOnly: true };

const register = async (req, res) => {
  try {
    const { token, ...user } = await authService.register(req.body);

    res.cookie("login", token, cookiesOptions).json(user);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { token, ...user } = await authService.login(req.body);
    res.cookie("login", token, cookiesOptions).json(user);
  } catch (error) {
    console.log(error);
  }
};

const logout = async (_req, res) => {
  try {
    res.clearCookie("login").json({ message: "logout" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, logout };
