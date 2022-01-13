const express = require("express");
const { userController } = require("../controllers");

const userRoutes = express.Router();

userRoutes.get("/", userController.getUsersController);
userRoutes.get("/:id", userController.findUserbyIdController);
userRoutes.post("/", userController.insertNewUserController);
userRoutes.put("/:id", userController.updateUserController);
userRoutes.delete("/:id", userController.deleteUserController);
userRoutes.get("/:id/reports", userController.reportsFromUserIdController);
userRoutes.get("/:id/rated", userController.ratedSpotsFromUserIdController);

module.exports = userRoutes;
