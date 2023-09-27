const express = require("express");
const userRouter = express.Router();
const userController = require("./userController");

userRouter.get("/login", userController.getLogin);
userRouter.post("/login", userController.postLogin);

userRouter.get("/signup", userController.getSignUp);
userRouter.post("/signup", userController.postSignUp);

userRouter.get("/reset", userController.getReset);
userRouter.post("/reset", userController.postReset);

userRouter.get("/auth", userController.getAuth);
userRouter.post("/auth", userController.postAuth);

userRouter.get("/info", userController.getInfo);
userRouter.post("/info", userController.postInfo);

userRouter.get("/exit", userController.getExit);

module.exports = userRouter;
