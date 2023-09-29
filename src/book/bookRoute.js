const express = require("express");
const bookRouter = express.Router();
const bookController = require("./bookController");

bookRouter.get("/list", bookController.getBookListAndCategoryCount);
bookRouter.get("/view", bookController.getBookView);
bookRouter.get("/delete", bookController.getBookDelete);

bookRouter.get("/toc/write", bookController.getBookTocWrite);

module.exports = bookRouter;
