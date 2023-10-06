const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.serverPort;
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./src/middlewares/jwtAuthMiddleware");

const router = require("./src/index");
const bookRepository = require("./src/book/bookRepository");

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});

app.use(express.static("views/public"));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware.auth);

app.use(router);
app.use(async (err, req, res, next) => {
  if (err.message === "5000") res.status(500).send("DB Error!");
  if (err.message === "4000") res.status(400).send("Bad Request");
  if (err.message === "4003") res.status(400).send("목차가 생성되지 않음.");
  if (err.message === "4004") res.status(400).send("해당 uid가 존재하지 않음.");

  // 4005: 입력 값을 확인해 주세요.
  if (err.message === "4005") res.render("user/login.html", { error: 4005 });
  // 4008: 로그인 후 이용해 주세요.
  if (err.message === "4008") res.render("user/login.html", { error: 4008 });

  if (err.message === "4006") res.status(400).send("권한이 없는 사용자입니다.");
  if (err.message === "4007")
    res.status(400).send("이미 존재하는 사용자입니다.");

  // 4020: 비밀번호가 틀립니다.
  if (err.message === "4020") res.redirect("/users/auth?error=4020");

  // 4050: 비밀번호를 입력해주세요.
  if (err.message === "4050") res.redirect("/users/auth?error=4050");

  // 4040: 이미 추천한 유저입니다.
  if (err.message == "4040") {
    const targetUrl =
      "/books/view?" + req.originalUrl.split("?")[1] + "&error=4040";
    res.redirect(targetUrl);
  }

  // POST /users/info 4060: 닉네임을 입력해 주세요.
  if (err.message == "4060") {
    const userUid = req.user.user_uid;
    const bookWriterCount = await bookRepository.countAllBookByWriter(userUid);
    res.render("user/info.html", {
      error: 4060,
      user_nickname: req.user.user_nickname,
      user_created_at: req.user.user_created_at,
      book_writer_count: bookWriterCount,
    });
  }
  if (err.message === "4041") res.status(400).send("입력값을 확인해 주세요.");

  if (err === "4444") res.redirect("/");
});

app.listen(port, () => {
  console.log(`server listen ${port}`);
});
