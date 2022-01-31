const Joi = require("joi");
const { userHelper } = require("../helpers");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    email: Joi.string().email().max(255).presence(presence),
    password: Joi.string().alphanum().min(8).max(50).presence(presence),
    role: Joi.string().max(3),
  }).validate(data, { abortEarly: false }).error;
};

const validatePermission = (currentUser, userId) => {
  if (
    !userHelper.isCurrentUser(currentUser, userId) &&
    !userHelper.isAdm(currentUser)
  )
    throw new UnauthorizedError("Permission denied");
};

module.exports = { validate, validatePermission };
