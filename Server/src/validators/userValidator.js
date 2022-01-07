const Joi = require("joi");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    email: Joi.string().email().max(255).presence(presence),
    password: Joi.string().alphanum().min(8).max(50).presence(presence),
    role: Joi.string().max(3),
  }).validate(data, { abortEarly: false }).error;
};

module.exports = { validate };
