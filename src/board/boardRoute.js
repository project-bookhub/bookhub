const express = require("express");
const boardRouter = express.Router();
const boardController = require("./boardController");

boardRouter.get("/", boardController.getBoard);
boardRouter.get("/write", boardController.getBoardWrite);
boardRouter.post("/write", boardController.postBoardWrite);

module.exports = boardRouter;
