const express = require("express");
const { userController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");

const userRoutes = express.Router();

userRoutes.get("/", userController.getUsersController);
userRoutes.get(
  "/current",
  authMiddleware,
  userController.getUserbyIdController
);
userRoutes.post("/", userController.insertNewUserController);
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

module.exports = userRoutes;
