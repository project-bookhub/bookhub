const express = require("express");
const boardRouter = express.Router();
const boardController = require("./boardController");

boardRouter.get("/", boardController.getBoard);

module.exports = boardRouter;
