const express = require("express");
const { userController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");

const userRoutes = express.Router();

userRoutes.get(
  "/current",
  authMiddleware,
  userController.getUserbyIdController
);

userRoutes.delete("/:id", userController.deleteUserController);
userRoutes.put("/current", authMiddleware, userController.updateUserController);
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
userRoutes.get(
  "/reportsrated",
  authMiddleware,
  userController.ratedSpotsFromUserController
);

module.exports = userRoutes;
