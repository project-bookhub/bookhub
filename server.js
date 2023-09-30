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
  if (err.message === "5000") res.status(500).send("DB Error!");
  if (err.message === "4000") res.status(400).send("Bad Request");
  if (err.message === "4003") res.status(400).send("목차가 생성되지 않음.");
  if (err.message === "4004") res.status(400).send("해당 uid가 존재하지 않음.");
});

app.listen(port, () => {
  console.log(`server listen ${port}`);
});
