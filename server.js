const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.serverPort;
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./src/middlewares/jwtAuthMiddleware");

const router = require("./src/index");

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});

app.use(express.static("views/public"));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware.auth);

app.use(router);
app.use((err, req, res, next) => {
  // 5000: DB error
  if (err.message === "5000") res.status(500).send("DB Error!");

  // 4000: 인증 에러
  if (err.message === "4000") res.status(500).send("인증 Error!");
});

app.listen(port, () => {
  console.log(`server listen ${port}`);
});
