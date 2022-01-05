const jwt = require("jsonwebtoken");

const { JWT_PRIVATE_KEY } = process.env;

const generateToken = ({ id, role }) => {
  try {
    if (!id || !role) throw new Error("Invalid token payload");

    return jwt.sign({ id, role }, JWT_PRIVATE_KEY, { expiresIn: "1h" });
  } catch (error) {
    console.log(error);
  }
};

const decodeToken = (token) => jwt.verify(token, JWT_PRIVATE_KEY);

module.exports = {
  generateToken,
  decodeToken,
};
