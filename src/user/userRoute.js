const express = require("express");
const userRouter = express.Router();
const userController = require("./userController");

userRouter.get("/signup", userController.getSignUp);
userRouter.post("/signup", userController.postSignUp);

userRouter.post("/login", userController.postLogin);

module.exports = userRouter;
