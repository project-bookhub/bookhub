const express = require("express");
const router = express.Router();
const userRouter = require("./user/userRoute");
const bookRouter = require("./book/bookRoute");
const boardRouter = require("./board/boardRoute");
const bookController = require("./book/bookController");

router.get("/", bookController.getBookList);

router.use("/users", userRouter);
router.use("/books", bookRouter);
router.use("/boards", boardRouter);

module.exports = router;
