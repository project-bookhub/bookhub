const express = require("express");
const boardRouter = express.Router();
const boardController = require("./boardController");

boardRouter.get("/", boardController.getBoard);
boardRouter.get("/write", boardController.getBoardWrite);
boardRouter.post("/write", boardController.postBoardWrite);
boardRouter.get("/modify", boardController.getBoardModify);

module.exports = boardRouter;
