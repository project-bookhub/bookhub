const express = require("express");
const router = express.Router();
const userRouter = require("./user/userRoute");
const bookRouter = require("./book/bookRoute");
const bookController = require("./book/bookController");


router.get("/", bookController.getBookList);


router.use("/users", userRouter);
router.use("/books", bookRouter);

module.exports = router;
