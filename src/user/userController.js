const userService = require("./userService");
const dataCheck = require("../lib/dataCheck");
require("dotenv").config();

exports.getLogin = (req, res) => {
  res.render("user/login.html");
};

exports.postLogin = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const userPw = req.body.userPw;

    const isDataCheck = dataCheck.checkNullUndefinedSpace([userId, userPw]);
    if (!isDataCheck) throw new Error(4005);

    const result = await userService.postLogin(userId, userPw);

    if (!result.isLogin) return res.redirect("/");

    res.cookie("authorization", result.data, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      domain: process.env.serverIp,
      path: "/",
    });
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.getLogout = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.user_uid : undefined;
    if (!userId) throw new Error(4008);

    res.clearCookie("authorization", { domain: process.env.serverIp });
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.getSignUp = (req, res) => {
  res.render("user/signup.html");
};

exports.postSignUp = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const userPw = req.body.userPw;
    const userNickname = req.body.userNickname;

    const isDataCheck = dataCheck.checkNullUndefinedSpace([
      userId,
      userPw,
      userNickname,
    ]);
    if (!isDataCheck) throw new Error(4005);

    await userService.postSignUp(userId, userPw, userNickname);

    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.getReset = (req, res) => {
  res.render("user/reset.html");
};

exports.postReset = async (req, res, next) => {
  try {
    const userNickname = req.body.userNickname;
    const userId = req.body.userId;
    const targetPw = req.body.targetPw;

    const result = await userService.postReset(userNickname, userId, targetPw);

    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.getAuth = (req, res) => {
  res.render("user/auth.html", {
    user_id: req.user ? req.user.user_id : undefined,
  });
};
exports.postAuth = async (req, res, next) => {
  try {
    const userUid = req.user.user_uid;
    const userId = req.user.user_id;
    const userPw = req.body.userPw;
    const isDataCheck = dataCheck.checkNullUndefinedSpace([
      userUid,
      userId,
      userPw,
    ]);
    if (!isDataCheck) throw new Error(4050);

    const bookWriterCount = await userService.postAuth(userUid, userId, userPw);

    res.render("user/info.html", {
      user_nickname: req.user.user_nickname,
      user_created_at: req.user.user_created_at,
      book_writer_count: bookWriterCount,
    });
  } catch (e) {
    next(e);
  }
};

exports.postInfo = async (req, res, next) => {
  try {
    const userNickname = req.body.userNickname;
    const userId = req.user.user_uid;

    const isDataCheck = dataCheck.checkNullUndefinedSpace([userNickname]);
    if (!isDataCheck) throw new Error(4060);

    const result = await userService.postInfo(userNickname, userId);

    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.getExit = async (req, res, next) => {
  try {
    const userId = req.user.user_uid;
    const result = await userService.getExit(userId);

    res.clearCookie("authorization", { domain: process.env.serverIp });

    res.redirect("/");
  } catch (e) {
    next(e);
  }
};
