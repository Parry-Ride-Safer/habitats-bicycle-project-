const express = require("express");
const { userController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");

const userRoutes = express.Router();

userRoutes.get("/", userController.getUsersController);
userRoutes.get(
  "/current",
  authMiddleware,
  userController.findUserbyIdController
);
userRoutes.post("/", userController.insertNewUserController);
userRoutes.put("/:id", userController.updateUserController);
userRoutes.delete("/:id", userController.deleteUserController);
userRoutes.get(
  "/reports",
  authMiddleware,
  userController.reportsFromUserIdController
);
userRoutes.get(
  "/rated",
  authMiddleware,
  userController.ratedSpotsFromUserIdController
);

module.exports = userRoutes;
