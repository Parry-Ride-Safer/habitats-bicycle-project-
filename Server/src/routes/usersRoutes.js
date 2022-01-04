const express = require("express");
const { userController } = require("../controllers");

const userRoutes = express.Router();

userRoutes.get("/", userController.getUsersController);
userRoutes.get("/:id", userController.findUserbyIdController);
userRoutes.post("/", userController.insertNewUserController);
userRoutes.put("/:id", userController.updateUserController);
userRoutes.delete("/:id", userController.deleteUserController);

module.exports = userRoutes;
