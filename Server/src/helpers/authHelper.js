const jwt = require("jsonwebtoken");

const { JWT_PRIVATE_KEY } = process.env;

const generateToken = ({ id, role }) => {
  try {
    if (!id || !role) throw new Error("INVALID_TOKEN_PAYLOAD");

    return jwt.sign({ id, role }, JWT_PRIVATE_KEY, { expiresIn: "3610000" });
  } catch (error) {
    console.log(error);
    if ("INVALID_TOKEN_PAYLOAD") res.status(401).send("Invalid Payload");
    else res.status(500).send("Error reading the token");
  }
};

const decodeToken = (token) => jwt.verify(token, JWT_PRIVATE_KEY);

module.exports = {
  generateToken,
  decodeToken,
};
