const express = require("express");
const bookRouter = express.Router();
const bookController = require("./bookController");

bookRouter.get("/list", bookController.getBookListAndCategoryCount);
bookRouter.get("/view", bookController.getBookView);
bookRouter.get("/delete", bookController.getBookDelete);

bookRouter.get("/toc/write", bookController.getBookTocWrite);
bookRouter.post("/toc/write", bookController.postBookTocWrite);
bookRouter.get("/toc/view", bookController.getBookTocView);
bookRouter.get("/toc/modify", bookController.getBookTocModify);
bookRouter.post("/toc/modify", bookController.postBookTocModify);

bookRouter.get("/page/view", bookController.getBookPageView);
bookRouter.get("/page/modify", bookController.getBookPageModify);
bookRouter.post("/page/modify", bookController.postBookPageModify);

module.exports = bookRouter;
