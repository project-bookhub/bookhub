const express = require("express");
const bookRouter = express.Router();
const bookController = require("./bookController");
require("dotenv").config();
const path = require("path");

const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "project-bookhub",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),

  //   용량제한
  limits: { fileSize: 5 * 1024 * 1024 },
});

bookRouter.get("/list", bookController.getBookListAndCategoryCount);
bookRouter.get("/view", bookController.getBookView);
bookRouter.get("/delete", bookController.getBookDelete);

bookRouter.get("/toc/write", bookController.getBookTocWrite);
bookRouter.post(
  "/toc/write",
  // 컨트롤러로 빼기
  upload.single("image"), //핸들러 함수
  bookController.postBookTocWrite,
);

bookRouter.get("/toc/view", bookController.getBookTocView);
bookRouter.get("/toc/modify", bookController.getBookTocModify);
bookRouter.post("/toc/modify", bookController.postBookTocModify);

bookRouter.get("/page/view", bookController.getBookPageView);
bookRouter.get("/page/modify", bookController.getBookPageModify);
bookRouter.post("/page/modify", bookController.postBookPageModify);

bookRouter.get("/search", bookController.getBookSearch);

module.exports = bookRouter;
